using App.Data.Contracts;
using System.ComponentModel.DataAnnotations;

namespace App.Data;

public record Auditable : IAuditable
{
    [Required]
    [StringLength(256)]
    public string createdBy { get; set; } = "";
    public DateTime createdOn { get; set; } = DateTime.UtcNow;
    [Required]
    [StringLength(256)]
    public string updatedBy { get; set; } = "";
    public DateTime? updatedOn { get; set; } = DateTime.UtcNow;
    public int revision { get; set; }

    public long id { get; set; }
}