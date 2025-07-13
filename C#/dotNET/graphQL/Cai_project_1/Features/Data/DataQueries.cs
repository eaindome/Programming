using App.Data;
using App.Features.Observability;
using Cai;

namespace App.Features.Data;



[Queries]
public partial class DataQueries
{
    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Department> departments(DataContext db, AuthContext authContext)
    {
        // todo: auth
        return db.departments;
    }
}
