using App.Data.Contracts;
using App.Features.Todo;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace App.Data;

partial class DataContext
{
    public DbSet<Department> departments { get; set; }
    public DbSet<Todo> Todos { get; set; }

}


[Index(nameof(name), IsUnique = true)]
public record Department : Auditable, INamedEntity
{
    public static string EntityName => nameof(Department);

    [StringLength(256)]
    public string name { get; set; } = string.Empty;
    public string notes { get; set; } = string.Empty;
}