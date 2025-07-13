using App.Common;
using Cai;

namespace App.Features.Data;



[Mutation<CallResult>]
public record CreateDepartment(string name, string notes);
[Mutation<CallResult>]
public record UpdateDepartment(long id, string name, string notes);
[Mutation<CallResult>]
public record DeleteDepartment(long id);