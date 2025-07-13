using App.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace App.Data;



partial class DataContext
{
    public DbSet<Dashboard> dashboards { get; set; }
}


public record Dashboard : Auditable, INamedEntity
{
    public static string EntityName => nameof(Dashboard);

    [StringLength(256)]
    public string name { get; set; }
    [StringLength(512)]
    public string description { get; set; }
    [StringLength(256)]
    public string viewer { get; set; }
    public JsonDocument? formDefinition { get; set; }
    public bool active { get; set; }
}

