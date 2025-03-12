using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationSystem.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Foreign key
        
        [Required]
        [MaxLength(500)]
        public required string Message { get; set; }
        
        [MaxLength(50)]
        public string? Type { get; set; } = "info";
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [NotMapped]
        public string Timestamp => CreatedAt.ToString("o"); // ISO 8601
    }
}
