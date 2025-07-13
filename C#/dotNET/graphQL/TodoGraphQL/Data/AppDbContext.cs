using Microsoft.EntityFrameworkCore;
using TodoGraphQL.Models;

namespace TodoGraphQL.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}
