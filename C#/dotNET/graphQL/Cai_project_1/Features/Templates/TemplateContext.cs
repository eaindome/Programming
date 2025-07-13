using App.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace App.Data;



partial class DataContext
{
    public DbSet<SmsTemplate> smsTemplates { get; set; }
    public DbSet<EmailTemplate> emailTemplates { get; set; }
}


[Index(nameof(name), IsUnique = true)]
[Index(nameof(active))]
public record SmsTemplate : Auditable, INamedEntity
{
    public static string EntityName => "Sms Template";

    [StringLength(256)]
    public string name { get; set; }
    [StringLength(512)]
    public string notes { get; set; }
    public string message { get; set; }
    [StringLength(128)]
    public string category { get; set; }
    public bool isSystemTemplate { get; set; }
    public bool active { get; set; }
}


[Index(nameof(name), IsUnique = true)]
[Index(nameof(active))]
public record EmailTemplate : Auditable, INamedEntity
{
    public static string EntityName => "Email Template";

    [StringLength(256)]
    public string name { get; set; }
    [StringLength(512)]
    public string notes { get; set; }
    public string subject { get; set; }
    public string message { get; set; }
    [StringLength(128)]
    public string category { get; set; }
    public bool isSystemTemplate { get; set; }
    public bool active { get; set; }
}