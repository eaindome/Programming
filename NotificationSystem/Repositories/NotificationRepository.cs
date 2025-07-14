using Microsoft.EntityFrameworkCore;
using NotificationSystem.Data;
using NotificationSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationSystem.Repositories
{
    public interface INotificationRepository
    {
        Task<(List<Notification> Items, int TotalCount)> GetNotificationsAsync(string? userId = null, int page = 1, int pageSize = 20, bool unreadOnly = false, string? type = null);
        Task<Notification> GetNotificationByIdAsync(int id);
        Task<Notification> CreateNotificationAsync(Notification notification);
        Task<bool> UpdateNotificationAsync(Notification notification);
        Task<bool> MarkAsReadAsync(int id);
        Task<int> MarkAllAsReadAsync(string? userId = null);
        Task<bool> DeleteNotificationAsync(int id);
    }

    public class NotificationRepository : INotificationRepository
    {
        private readonly AppDbContext _context;

        public NotificationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(List<Notification> Items, int TotalCount)> GetNotificationsAsync(
            string? userId = null, int page = 1, int pageSize = 20, bool unreadOnly = false, string? type = null)
        {
            var query = _context.Notifications.AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(userId) && int.TryParse(userId, out int parsedUserId))
            {
                query = query.Where(n => n.UserId == parsedUserId);
            }

            if (unreadOnly)
            {
                query = query.Where(n => !n.IsRead);
            }

            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(n => n.Type == type);
            }

            // Get total count before paging
            var totalCount = await query.CountAsync();

            // Apply ordering and pagination
            var items = await query
                .OrderByDescending(n => n.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }

        public async Task<Notification> GetNotificationByIdAsync(int id)
        {
            return await _context.Notifications.FindAsync(id) ?? throw new InvalidOperationException("Notification not found");
        }

        public async Task<Notification> CreateNotificationAsync(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return notification;
        }

        public async Task<bool> UpdateNotificationAsync(Notification notification)
        {
            _context.Entry(notification).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> MarkAsReadAsync(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return false;
            }

            notification.IsRead = true;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<int> MarkAllAsReadAsync(string? userId = null)
        {
            var query = _context.Notifications.Where(n => !n.IsRead);

            if (!string.IsNullOrEmpty(userId) && int.TryParse(userId, out int parsedUserId))
            {
                query = query.Where(n => n.UserId == parsedUserId);
            }

            return await query.ExecuteUpdateAsync(s => s.SetProperty(n => n.IsRead, true));
        }

        public async Task<bool> DeleteNotificationAsync(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return false;
            }

            _context.Notifications.Remove(notification);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}