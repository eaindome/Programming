using App.Data.Contracts;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using App.Features.Audit;

namespace App.Data;


partial class DataContext
{
    public DbSet<User> users { get; set; }
    public DbSet<UserStatus> userStatuses { get; set; }
    public DbSet<Role> roles { get; set; }
    public DbSet<UserFeed> userFeeds { get; set; }
}



public record User: Auditable, INamedEntity
{
    public static string EntityName => "User";
    [StringLength(256)]
    public string firstName { get; set; }
    [StringLength(256)]
    public string surname { get; set; }
    [StringLength(32)]
    public string staffNumber { get; set; }
    [StringLength(256)]
    public string email { get; set; }
    [StringLength(256)]
    public string contactNumber { get; set; }

    public long departmentId { get; set; }
    public virtual Department department { get; set; }

    public long statusId { get; set; }
    public virtual UserStatus status { get; set; }

    public long roleId { get; set; }
    public virtual Role role { get; set; }

    public bool active { get; set; }
    [StringLength(256)]
    public string username { get; set; }
    [Column(TypeName = "character varying(32)")]
    public UserType type { get; set; }

    public long? activeDashboardId { get; set; }
    public virtual Dashboard? activeDashboard { get; set; }

    public bool isTruelyActive()
    {
        return active && status?.name == "Active";
    }
}
public enum UserType { Staff }


[Index(nameof(name), IsUnique = true)]
public record UserStatus : Auditable, INamedEntity
{
    public static string EntityName => "User Status";
    [StringLength(128)]
    public string name { get; set; }
    [StringLength(256)]
    public string notes { get; set; }
    public bool isActive { get; set; }
}


[Index(nameof(name), IsUnique = true)]
public record Role : Auditable, INamedEntity
{
    public static string EntityName => "Role";
    [StringLength(128)]
    public string name { get; set; }
    public string notes { get; set; }
    public string[] permissions { get; set; }
    public long[] dashboards { get; set; }
    public long[] reports { get; set; }
    /// <summary>
    /// When set to false, staff using the role will not be permitted to access any resources
    /// </summary>
    public bool active { get; set; }
}

[Index(nameof(userId))]
public record UserFeed : Auditable
{
    public long userId { get; set; }
    public virtual User user { get; set; }

    [Column(TypeName = "character varying(64)")]
    public UserActivityType activity { get; set; }
    [Column(TypeName = "character varying(64)")]
    public EventType type { get; set; }
    public string title { get; set; } = "";
    public string notes { get; set; }

    public long? entityId { get; set; }
    public string? entityType { get; set; }
}
public enum UserActivityType
{
    AccountCreated, Create, Update, Delete, Read
}
