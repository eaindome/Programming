using App.Common.Extensions;
using App.Common;
using App.Features.Observability;
using App.Features.Audit;
using App.Data;

namespace App.Features.Data;

public class DepartmentHandler
{
    public static async Task<CallResult> Handle(CreateDepartment input, DataContext db, AuthContext authContext, ILogger<DepartmentHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = new Department { name = input.name, notes = input.notes };
            db.departments.Add(entity);
            await db.SaveChangesAsync(cancellationToken);

            db.auditCreate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Department created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(UpdateDepartment input, DataContext db, AuthContext authContext, ILogger<DepartmentHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<Department>(input.id);
            entity.name = input.name;
            entity.notes = input.notes;

            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Department updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteDepartment input, DataContext db, AuthContext authContext, ILogger<DepartmentHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<Department>(input.id);
            db.departments.Remove(entity);
            db.auditDelete(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Department deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
}
