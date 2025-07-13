using App.Common;
using App.Data;
using App.Features.Observability;
using App.Features.Security;
using Cai;
using Microsoft.EntityFrameworkCore;

namespace App.Features.UserManagement;



[Queries]
public partial class UserQueries
{
    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<User> users(DataContext db, AuthContext authContext)
    {
        // todo: auth
        return db.users;
    }

    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Role> roles(DataContext db, AuthContext authContext)
    {
        // todo: auth
        return db.roles;
    }

    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<UserStatus> userStatuses(DataContext db, AuthContext authContext)
    {
        // todo: auth
        return db.userStatuses;
    }

    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<UserFeed> userFeeds(DataContext db, AuthContext authContext)
    {
        // todo: auth
        return db.userFeeds; //.Where(x => x.userId == userId);
    }

    public string[] permissions()
    {
        return Permissions.all;
    }

    public async Task<CallResult<Me>> me(DataContext db, AuthContext authContext, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn)
        {
            if (!string.IsNullOrWhiteSpace(authContext.username))
            {
                return CallResult<Me>.error($"The account {authContext.username} is not properly setup. Please contact the administrator", 402);
            }
            return CallResult<Me>.error("Not authenticated", 401);
        }
        var user = await db.users
            .AsNoTracking()
            .Where(x => x.id == authContext.userId)
            .Select(x => new Me
            {
                firstName = x.firstName,
                lastName = x.surname,
                middleNames = "",
                roleId = x.roleId,
                role = x.role.name,
                id = x.id,
                departmentId = x.departmentId,
                department = x.department.name,
                permissions = x.role.permissions,
                type = x.type,
                activeDashboardId = x.activeDashboardId
            })
            .FirstOrDefaultAsync(cancellationToken);
        if (user == null)
        {
            return CallResult<Me>.error("Account not found", 404);
        }
        return CallResult<Me>.ok(user!, "Ok");
    }

    [UseProjection]
    [UseFirstOrDefault]
    [Error<GeneralException>]
    public async Task<IQueryable<User>> currentUser(DataContext db, AuthContext authContext, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn)
        {
            if (!string.IsNullOrWhiteSpace(authContext.username))
            {
                throw new GeneralException($"The account {authContext.username} is not properly setup. Please contact the administrator");
            }
        }
        return db.users
            .Include(x => x.role)
            .Include(x => x.department)
            .AsNoTracking()
            .Where(x => x.id == authContext.userId);
    }
}
