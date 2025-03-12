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

        public NotificationsController(AppDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications([FromQuery] string? userId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var query = _context.Notifications.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                if (int.TryParse(userId, out int parsedUserId))
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
            try {
                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();

                try
                {
                    // send real time notification using signalr
                    if (notification.UserId != 0) 
                    {
                        await _hubContext.Clients.User(notification.UserId.ToString()).SendAsync("ReceiveNotification", notification);
                    } 
                    else 
                    {
                        await _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
                    }
                } catch (Exception ex)
                {
                    Console.WriteLine($"SignalR error: {ex.Message}");
                }

                return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, notification);
                }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occured while creating the notifications: {ex.Message}");
            }
        }

        // PUT: api/notifications/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, Notification notification)
        {
            if (id != notification.Id)
            {
                return BadRequest();
            }

            _context.Entry(notification).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Notifications.Any(e => e.Id == id))
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
            var query = _context.Notifications.Where(n => !n.IsRead);

            if (!string.IsNullOrEmpty(userId))
            {
                if (int.TryParse(userId, out int parsedUserId))
                {
                    query = query.Where(n => n.UserId == parsedUserId);
                }
            }

            await query.ExecuteUpdateAsync(s => s.SetProperty(n => n.IsRead, true));

            return NoContent();
        }

        // GET: api/notifications/unread
        [HttpGet("unread")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetUnreadNotifications([FromQuery] string? userId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var query = _context.Notifications.Where(n => !n.IsRead);

            if (int.TryParse(userId, out int parsedUserId))
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
            var query = _context.Notifications.Where(n => n.Type == type);

            if (int.TryParse(userId, out int parsedUserId))
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

        // DELETe: api/notifications/{id}
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