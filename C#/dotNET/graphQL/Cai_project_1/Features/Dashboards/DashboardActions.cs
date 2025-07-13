using App.Common;
using Cai;

namespace App.Features.Dashboards;


[Mutation<CallResult>]
public record CreateDashboard(string name, string description, string viewer, string definition);
[Mutation<CallResult>]
public record UpdateDashboard(long id, string name, string description, string viewer, string? definition);
[Mutation<CallResult>]
public record DeleteDashboard(long id);
[Mutation<CallResult>]
public record ActivateDashboard(long id);
[Mutation<CallResult>]
public record DeactivateDashboard(long id);