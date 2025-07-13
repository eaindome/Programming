using App.Data;
using App.Features.Observability;
using Cai;
using Microsoft.EntityFrameworkCore;

namespace App.Features.Dashboards;



[Queries]
public partial class DashboardQueries
{
    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Dashboard> dashboards(DataContext db, AuthContext authContext)
    {
        // todo: permissions
        return db.dashboards;
    }

    public async Task<Dashboard[]> myDashboards(DataContext db, AuthContext authContext, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return [];
        var dashboardIds = await db.users
            .Where(x => x.id == authContext.userId)
            .Select(x => x.role.dashboards)
            .FirstOrDefaultAsync(cancellationToken) ?? [];
        if (!dashboardIds.Any()) return [];
        return await db.dashboards
            .Where(x => dashboardIds.Contains(x.id))
            .ToArrayAsync(cancellationToken);
    }
}