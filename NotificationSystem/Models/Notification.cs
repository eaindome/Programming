using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace NotificationSystem.Models
{
    public class Notification
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign key
        
        [Required(ErrorMessage = "Notification message is required")]
        [MaxLength(500, ErrorMessage = "Message cannot exceed 500 characters")]
        public required string Message { get; set; }
        
        [MaxLength(50, ErrorMessage = "Type cannot exceed 50 characters")]
        public string? Type { get; set; } = "info";
        
        public bool IsRead { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [NotMapped]
        public string Timestamp => CreatedAt.ToString("o");
        
        // Additional properties for more information
        [MaxLength(255)]
        public string? ActionUrl { get; set; }
        
        [MaxLength(50)]
        public string? Priority { get; set; } = "normal";
        
        // Navigation property
        [JsonIgnore]
        public User? User { get; set; } 
    }
}