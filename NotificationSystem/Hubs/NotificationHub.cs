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
            if (!string.IsNullOrEmpty(notification.UserId.ToString()))
            {
                await Clients.User(notification.UserId.ToString()).SendAsync("ReceiveNotification", notification);
            }
            else
            {
                await Clients.All.SendAsync("ReceiveNotification", notification);
            }
        }
    }
}