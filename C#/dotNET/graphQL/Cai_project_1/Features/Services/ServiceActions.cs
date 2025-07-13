using App.Common;
using App.Data;
using App.Features.Observability;
using App.Features.UserManagement;
using Cai;

namespace App.Features.Services;


[Mutation<CallResult>]
public record RestartService(string serviceName);


[Queries]
public partial class ServiceQueries
{
    [Error<GeneralException>]
    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseSorting]
    [UseFiltering]
    public IQueryable<ServiceFeed> serviceFeeds(DataContext db, AuthContext authContext)
    {
        // todo: permissions
        return db.serviceFeeds;
    }

    public ServiceInfo[] services => [
        new(UserService.serviceName, "Finalizes fund id requests", UserService.serviceName, "ph:users-four-fil", true)
    ];
    public string[] serviceNames => [UserService.serviceName];
}