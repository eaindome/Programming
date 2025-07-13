using App.Data.Contracts;
using App.Features.Observability;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace App.Data;



public class AuditIntereceptor : SaveChangesInterceptor
{
    private readonly IServiceProvider serviceProvider;

    public AuditIntereceptor(IServiceProvider serviceProvider)
    {
        this.serviceProvider = serviceProvider;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        if (eventData.Context == null) return base.SavingChanges(eventData, result);
        createAuditEntries(eventData.Context);
        return result;
    }
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        if (eventData.Context == null) return base.SavingChangesAsync(eventData, result);
        createAuditEntries(eventData.Context);
        return ValueTask.FromResult(result);
    }

    public void createAuditEntries(DbContext context)
    {
        if (context == null) return;
        var username = getActiveUser();
        context.ChangeTracker.DetectChanges();
        foreach (var entry in context.ChangeTracker.Entries().Where(x => x.Entity is IAuditable))
        {
            var entity = (IAuditable)entry.Entity;
            switch (entry.State)
            {
                case EntityState.Added:
                    entity.createdBy = username;
                    entity.createdOn = DateTime.UtcNow;
                    entity.updatedBy = username;
                    entity.updatedOn = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entity.updatedBy = username;
                    entity.updatedOn = DateTime.UtcNow;
                    break;
                case EntityState.Deleted:
                    // todo: find a way of capturing the deletion. Maybe capture the entry in another table or if multiple entries are possible, use that.
                    break;
            }
        }
    }
    public string getActiveUser()
    {
        var authContext = serviceProvider.GetService<AuthContext>();
        return authContext?.username ?? "unknown";
    }
}