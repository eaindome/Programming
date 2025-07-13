using App.Common.Extensions;
using App.Common;
using App.Data;
using App.Features.Observability;
using App.Features.Audit;
using Microsoft.EntityFrameworkCore;

namespace App.Features.UserManagement;



public class UserHandler
{
    public static async Task<CallResult> Handle(CreateRole input, DataContext db, AuthContext authContext, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permissions
        try
        {
            var entity = new Role { active = input.active, name = input.name, notes = input.notes, permissions = input.permissions, dashboards = input.dashboards, reports = input.reports };
            db.roles.Add(entity);
            await db.SaveChangesAsync(cancellationToken);
            db.auditCreate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);
            return CallResult.ok("Role created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }

    public static async Task<CallResult> Handle(UpdateRole input, DataContext db, AuthContext authContext, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var roles = await db.Set<Role>().ToListAsync(cancellationToken: cancellationToken);
            var entity = await db.firstAsync<Role>(input.id);
            entity.notes = input.notes;
            entity.active = input.active;
            entity.permissions = input.permissions;
            entity.name = input.name;
            entity.dashboards = input.dashboards;
            entity.reports = input.reports;

            db.auditUpdate(entity, entity.name, authContext.userId);

            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Role updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteRole input, DataContext db, AuthContext authContext, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<Role>(input.id);
            db.roles.Remove(entity);
            db.auditDelete(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Role deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }

    public static async Task<CallResult> Handle(CreateUserStatus input, DataContext db, AuthContext authContext, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permissions
        try
        {
            var entity = new UserStatus { name = input.name, notes = input.notes };
            db.userStatuses.Add(entity);
            await db.SaveChangesAsync(cancellationToken);
            db.auditCreate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);
            return CallResult.ok("User Status created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e);
            return CallResult.error(e.sanitize());
        }
    }

    public static async Task<CallResult> Handle(UpdateUserStatus input, DataContext db, AuthContext authContext, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<UserStatus>(input.id);
            entity.notes = input.notes;
            entity.name = input.name;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("User Status updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteUserStatus input, DataContext db, AuthContext authContext, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<UserStatus>(input.id);
            db.userStatuses.Remove(entity);
            db.auditDelete(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("User Status deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }


    public static async Task<CallResult> Handle(CreateUser input, DataContext db, AuthContext authContext, [Service] UserService userService, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: check permissions
        try
        {
            // todo: check for uniqueness
            var user = new User() { active = true, contactNumber = input.contactNumber ?? "", departmentId = input.departmentId, email = input.email, firstName = input.firstName, username = input.username, roleId = input.roleId, staffNumber = input.staffNumber, surname = input.lastName, statusId = input.statusId, type = UserType.Staff };
            db.users.Add(user);
            db.userFeeds.Add(new() { user = user, activity = UserActivityType.AccountCreated, notes = "", title = "Account Created", type = EventType.Information });
            await db.SaveChangesAsync(cancellationToken);
            db.auditCreate(user, $"{user.firstName} {user.surname}", authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            userService.notify();

            return CallResult.ok("Account created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(authContext.username, input, e);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(UpdateUser input, DataContext db, AuthContext authContext, [Service] UserService userService, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<User>(input.id);
            entity.firstName = input.firstName;
            entity.surname = input.lastName;
            entity.staffNumber = input.staffNumber;
            entity.email = input.email;
            entity.statusId = input.statusId;
            entity.roleId = input.roleId;
            entity.active = input.active;
            entity.username = input.username;
            entity.contactNumber = input.contactNumber;
            entity.departmentId = input.departmentId;

            db.auditUpdate(entity, $"{entity.firstName} {entity.surname}", authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            userService.notify();

            return CallResult.ok("User updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(authContext.username, input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteUser input, DataContext db, AuthContext authContext, [Service] UserService userService, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<User>(input.id);
            db.users.Remove(entity);
            db.auditDelete(entity, $"{entity.firstName} {entity.surname}", authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            userService.notify();

            return CallResult.ok("User deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(LockUser input, DataContext db, AuthContext authContext, [Service] UserService userService, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<User>(input.id);
            entity.active = false;
            db.auditUpdate(entity, $"{entity.firstName} {entity.surname}", authContext.userId, "Account locked");
            await db.SaveChangesAsync(cancellationToken);

            userService.notify();

            return CallResult.ok("User locked successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(authContext.username, input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(UnlockUser input, DataContext db, AuthContext authContext, [Service] UserService userService, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<User>(input.id);
            entity.active = true;
            db.auditUpdate(entity, $"{entity.firstName} {entity.surname}", authContext.userId, "Account unlocked");
            await db.SaveChangesAsync(cancellationToken);

            userService.notify();

            return CallResult.ok("User unlocked successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(authContext.username, input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(SetActiveDashboard input, DataContext db, AuthContext authContext, [Service] UserService userService, ILogger<UserHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<User>(authContext.userId);
            entity.activeDashboardId = input.dashboardId;
            db.auditUpdate(entity, $"{entity.firstName} {entity.surname}", authContext.userId, "Active Dashboard set");
            await db.SaveChangesAsync(cancellationToken);

            userService.notify();

            return CallResult.ok("User unlocked successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(authContext.username, input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
}