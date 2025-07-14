using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotificationSystem.Data;
using NotificationSystem.Models;
using NotificationSystem.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationSystem.Controllers 
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ILogger<NotificationsController> _logger;
        public NotificationsController(AppDbContext context, IHubContext<NotificationHub> hubContext, ILogger<NotificationsController> logger)
        {
            _logger = logger;
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications([FromQuery] string? userId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 20;

            var query = _context.Notifications.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                if (TryParseUserId(userId, out int parsedUserId))
                {
                    query = query.Where(n => n.UserId == parsedUserId);
                }
            }

            var totalCount = await query.CountAsync();
            var notifications = await query
                .OrderByDescending(n => n.CreatedAt)
                .Skip((page -1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Append("X-Total-Count", totalCount.ToString());

            return notifications;
        }

        private bool TryParseUserId(string? userId, out int parsedUserId)
        {
            parsedUserId = 0;
            if (string.IsNullOrEmpty(userId))
            {
                return false;
            }
            
            return int.TryParse(userId, out parsedUserId);
        }

        // GET: api/notifications/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Notification>> GetNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return NotFound();
            }

            return notification;
        }

        // POST: api/notifications
        [HttpPost]
        public async Task<ActionResult<Notification>> CreateNotification(Notification notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Validate notification fields
                if (string.IsNullOrEmpty(notification.Message))
                {
                    return BadRequest("Notification message is required");
                }

                // Set default values if not provided
                notification.CreatedAt = DateTime.UtcNow;
                if (string.IsNullOrEmpty(notification.Type))
                {
                    notification.Type = "info";
                }

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();

                // Send real-time notification
                await SendNotificationViaSignalR(notification);

                return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, notification);
            }
            catch (Exception ex)
            {
                // Log the exception properly
                _logger.LogError(ex, "Error creating notification");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        private async Task SendNotificationViaSignalR(Notification notification)
        {
            try
            {
                // For testing without authentication, you can send to all or specific connection groups
                // In production, you should use the connection mapping from NotificationHub
                if (notification.UserId != 0)
                {
                    var userIdString = notification.UserId.ToString();
                    
                    // For testing - send to a group with the userId as the group name
                    await _hubContext.Clients.Group(userIdString)
                        .SendAsync("ReceiveNotification", notification);
                }
                else
                {
                    await _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
                }
            }
            catch (Exception ex)
            {
                // Log but don't rethrow to prevent API failure
                _logger.LogError(ex, "Error sending SignalR notification");
            }
        }

        // PUT: api/notifications/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, Notification notification)
        {
            if (id != notification.Id)
            {
                return BadRequest("The ID in the URL must match the ID in the request body");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(notification).State = EntityState.Modified;
            // Don't update the creation date
            _context.Entry(notification).Property(x => x.CreatedAt).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await NotificationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private async Task<bool> NotificationExists(int id)
        {
            return await _context.Notifications.AnyAsync(e => e.Id == id);
        }

        // PATCH: api/notifications/{id}/read
        [HttpPatch("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null) 
            {
                return NotFound();
            }

            notification.IsRead = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/notifications/read-all
        [HttpPost("read-all")]
        public async Task<IActionResult> MarkAllAsRead([FromQuery] string? userId = null)
        {
            try
            {
                var query = _context.Notifications.Where(n => !n.IsRead);

                if (!string.IsNullOrEmpty(userId))
                {
                    if (TryParseUserId(userId, out int parsedUserId))
                    {
                        query = query.Where(n => n.UserId == parsedUserId);
                    }

                    // Process in batches for better performance with large datasets
                    const int batchSize = 1000;
                    int processed = 0;
                    int total;

                    do
                    {
                        var batch = await query.Take(batchSize).ToListAsync();
                        total = batch.Count;

                        foreach (var notification in batch)
                        {
                            notification.IsRead = true;
                        }

                        await _context.SaveChangesAsync();
                        processed += total;
                    }
                    while (total == batchSize);
                    
                    return NoContent();
                }
                else
                {
                    // If no userId specified, mark all as read using batch update
                    await query.ExecuteUpdateAsync(s => s.SetProperty(n => n.IsRead, true));
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking notifications as read");
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        // GET: api/notifications/unread
        [HttpGet("unread")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetUnreadNotifications([FromQuery] string? userId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 20;
            
            var query = _context.Notifications.Where(n => !n.IsRead);

            if (!string.IsNullOrEmpty(userId) && TryParseUserId(userId, out int parsedUserId))
            {
                query = query.Where(n => n.UserId == parsedUserId);
            }

            var totalCount = await query.CountAsync();
            var notifications = await query
                .OrderByDescending(n => n.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Append("X-Total-Count", totalCount.ToString());

            return notifications;
        }

        // GET: api/notifications/by-type/{type}
        [HttpGet("by-type/{type}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotificationsByType(string type, [FromQuery] string? userId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 20;
            
            if (string.IsNullOrEmpty(type))
            {
                return BadRequest("Type parameter cannot be empty");
            }
            
            var query = _context.Notifications.Where(n => n.Type == type);

            if (!string.IsNullOrEmpty(userId) && TryParseUserId(userId, out int parsedUserId))
            {
                query = query.Where(n => n.UserId == parsedUserId);
            }

            var totalCount = await query.CountAsync();
            var notifications = await query
                .OrderByDescending(n => n.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Append("X-Total-Count", totalCount.ToString());

            return notifications;
        }

        // DELETE: api/notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}