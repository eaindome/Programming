using Cai.Reporting;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using App.Features.Audit;
using App.Features.Reports;

namespace App.Data;



partial class DataContext
{
    public DbSet<ReportDefinition> reportDefinitions { get; set; }
    public DbSet<QueuedReport> queuedReports { get; set; }
    public DbSet<QueuedReportFeed> queuedReportFeeds { get; set; }
}




public record ReportDefinition : Auditable
{
    [StringLength(128)]
    public string name { get; set; }
    [StringLength(256)]
    public string description { get; set; }
    public string reportDefinition { get; set; }
    public string formDefinition { get; set; }
    public string parameters { get; set; }
    public bool active { get; set; }
    [StringLength(128)]
    public string category { get; set; }
    [Column(TypeName = "character varying(32)")]
    public ReportRendererType renderer { get; set; }
}

[Index(nameof(status))]
[Index(nameof(userId))]
[Index(nameof(active))]
public record QueuedReport : Auditable
{
    public long userId { get; set; }
    public virtual User user { get; set; }

    public long reportId { get; set; }
    public virtual ReportDefinition report { get; set; }

    [Column(TypeName = "character varying(32)")]
    public OutputFormat outputFormat { get; set; }

    public string? filename { get; set; }

    [Column(TypeName = "character varying(32)")]
    public QueuedReportStatus status { get; set; }

    public string? filterJson { get; set; }
    public string notes { get; set; }

    public bool active { get; set; }
}
public enum QueuedReportStatus
{
    Pending, Processing, PendingEmail, Processed, Failed
}

[Index(nameof(requestId))]
public record QueuedReportFeed : Auditable
{
    public long requestId { get; set; }
    public virtual QueuedReport request { get; set; }

    [Column(TypeName = "character varying(64)")]
    public QueuedReportEvent activity { get; set; }
    [Column(TypeName = "character varying(64)")]
    public EventType type { get; set; }
    public string title { get; set; } = "";
    public string notes { get; set; }

    public long? userId { get; set; }
    public virtual User? user { get; set; }
}
public enum QueuedReportEvent
{
    Created, Processed, Failed
}