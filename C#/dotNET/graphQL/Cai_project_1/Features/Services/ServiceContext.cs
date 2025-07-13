using App.Data;
using App.Features.Audit;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Data;


partial class DataContext
{
    public DbSet<ServiceFeed> serviceFeeds { get; set; }
}


[Index(nameof(service))]
public record ServiceFeed : Auditable
{
    public string service { get; set; }

    [Column(TypeName = "character varying(64)")]
    public ServiceEvent activity { get; set; }
    [Column(TypeName = "character varying(64)")]
    public EventType type { get; set; }
    public string title { get; set; } = "";
    public string notes { get; set; }
}

public enum ServiceEvent
{
    InProgress
}

public record ServiceInfo(string name, string description, string code, string icon, bool isService);