using Microsoft.AspNetCore.SignalR;
using NotificationSystem.Models;
using System.Threading.Tasks;
using System.Security.Claims;

namespace NotificationSystem.Hubs
{
    public class NotificationHub : Hub
    {
        private static readonly Dictionary<string, HashSet<string>> _userConnections = 
            new Dictionary<string, HashSet<string>>();
        private readonly ILogger<NotificationHub> _logger;

        public NotificationHub(ILogger<NotificationHub> logger)
        {
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            try
            {
                var userId = GetUserId();
                if (!string.IsNullOrEmpty(userId))
                {
                    AddUserConnection(userId, Context.ConnectionId);
                    await Groups.AddToGroupAsync(Context.ConnectionId, userId);
                    _logger.LogInformation($"User {userId} connected with connection ID {Context.ConnectionId}");
                }
                else
                {
                    // For unauthenticated testing
                    _logger.LogInformation($"Anonymous connection established with ID {Context.ConnectionId}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in OnConnectedAsync");
            }
            
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            try
            {
                var userId = GetUserId();
                if (!string.IsNullOrEmpty(userId))
                {
                    RemoveUserConnection(userId, Context.ConnectionId);
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
                    _logger.LogInformation($"User {userId} disconnected with connection ID {Context.ConnectionId}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in OnDisconnectedAsync");
            }
            
            await base.OnDisconnectedAsync(exception);
        }
        
        // For testing purposes - allow clients to register a user ID manually
        public async Task RegisterUserId(string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                // Clean up any previous registration
                var currentUserId = GetUserId();
                if (!string.IsNullOrEmpty(currentUserId))
                {
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, currentUserId);
                    RemoveUserConnection(currentUserId, Context.ConnectionId);
                }
                
                // Register the new userId
                AddUserConnection(userId, Context.ConnectionId);
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
                _logger.LogInformation($"User ID {userId} manually registered for connection {Context.ConnectionId}");
            }
        }

        private string? GetUserId()
        {
            // Try to get from claims first (for authenticated users)
            var userIdFromClaims = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (!string.IsNullOrEmpty(userIdFromClaims))
            {
                return userIdFromClaims;
            }
            
            // For unauthenticated testing, could store in connection state
            return null;
        }

        private void AddUserConnection(string userId, string connectionId)
        {
            lock (_userConnections)
            {
                if (!_userConnections.ContainsKey(userId))
                {
                    _userConnections[userId] = new HashSet<string>();
                }
                _userConnections[userId].Add(connectionId);
            }
        }

        private void RemoveUserConnection(string userId, string connectionId)
        {
            lock (_userConnections)
            {
                if (_userConnections.ContainsKey(userId))
                {
                    _userConnections[userId].Remove(connectionId);
                    if (_userConnections[userId].Count == 0)
                    {
                        _userConnections.Remove(userId);
                    }
                }
            }
        }
    }
}