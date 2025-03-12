using Microsoft.AspNetCore.SignalR;
using NotificationSystem.Models;
using System.Threading.Tasks;

namespace NotificationSystem.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", message);
        }

        public async Task SendNotificationObject(Notification notification)
        {
            if (!string.IsNullOrEmpty(notification.UserId))
            {
                await Clients.User(notification.UserId).SendAsync("ReceiveNotification", notification);
            }
            else
            {
                await Clients.All.SendAsync("ReceiveNotification", notification);
            }
        }
    }
}