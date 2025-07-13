using App.Common.Extensions;
using App.Common;
using App.Data;
using App.Features.Observability;
using System.Text.Json;
using App.Features.Audit;

namespace App.Features.Dashboards;



public class DashboardHandler
{
    public static async Task<CallResult> Handle(CreateDashboard input, DataContext db, AuthContext authContext, ILogger<DashboardHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        try
        {
            // todo: permission
            Dashboard entity = new() { name = input.name, description = input.description, viewer = input.viewer, formDefinition = JsonSerializer.SerializeToDocument(input.definition), active = true };
            db.dashboards.Add(entity);
            await db.SaveChangesAsync(cancellationToken);

            db.auditCreate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Dashboard created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }

    public static async Task<CallResult> Handle(UpdateDashboard input, DataContext db, AuthContext authContext, ILogger<DashboardHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        try
        {
            // todo: permission
            var entity = await db.firstAsync<Dashboard>(input.id);
            entity.name = input.name;
            entity.description = input.description;
            entity.viewer = input.viewer;
            if (input.description != null)
            {
                entity.formDefinition = JsonSerializer.SerializeToDocument(input.definition);
            }

            db.auditUpdate(entity, input.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);
            return CallResult.ok("Dashboard updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteDashboard input, DataContext db, AuthContext authContext, ILogger<DashboardHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        try
        {
            // todo: permission
            var entity = await db.firstAsync<Dashboard>(input.id);
            db.dashboards.Remove(entity);
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);
            return CallResult.ok("Dashboard deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(ActivateDashboard input, DataContext db, AuthContext authContext, ILogger<DashboardHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        try
        {
            // todo: permission
            var entity = await db.firstAsync<Dashboard>(input.id);
            entity.active = true;

            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);
            return CallResult.ok("Dashboard activated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeactivateDashboard input, DataContext db, AuthContext authContext, ILogger<DashboardHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        try
        {
            // todo: permission
            var entity = await db.firstAsync<Dashboard>(input.id);
            entity.active = false;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);
            return CallResult.ok("Dashboard deactivated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }
}