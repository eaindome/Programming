using Microsoft.EntityFrameworkCore;

namespace App.Data;

public partial class DataContext: DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    // Todo DbSet registration
    public DbSet<Todo> Todos { get; set; } = null!;

    public async Task<int> save<T>(T entity, CancellationToken cancellationToken = default)
    {
        await AddAsync(entity!, cancellationToken: cancellationToken);
        return await SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserFeed>()
            .Property(x => x.activity).HasConversion<string>();
    }
}
