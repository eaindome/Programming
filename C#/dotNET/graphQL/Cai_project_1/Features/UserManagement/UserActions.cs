using App.Common;
using Cai;

namespace App.Features.UserManagement;



[Mutation<CallResult>]
public record CreateRole(string name, string notes, string[] permissions, long[] dashboards, long[] reports, bool active);
[Mutation<CallResult>]
public record UpdateRole(long id, string name, string notes, string[] permissions, long[] dashboards, long[] reports, bool active);
[Mutation<CallResult>]
public record DeleteRole(long id);

[Mutation<CallResult>]
public record CreateUserStatus(string name, string notes);
[Mutation<CallResult>]
public record UpdateUserStatus(long id, string name, string notes);
[Mutation<CallResult>]
public record DeleteUserStatus(long id);


[Mutation<CallResult>]
public record CreateUser
{
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string staffNumber { get; set; }
    public string email { get; set; }
    public string? contactNumber { get; set; }
    public long departmentId { get; set; }
    public long statusId { get; set; }
    public long roleId { get; set; }
    public bool active { get; set; }
    public string username { get; set; }
}
[Mutation<CallResult>]
public record UpdateUser : CreateUser
{
    public long id { get; set; }
}
[Mutation<CallResult>]
public record DeleteUser(long id);
[Mutation<CallResult>]
public record LockUser(long id);
[Mutation<CallResult>]
public record UnlockUser(long id);
[Mutation<CallResult>]
public record SetActiveDashboard(long dashboardId);
[Mutation<CallResult>]
public record SetActiveEdifyCountry(long? countryId);