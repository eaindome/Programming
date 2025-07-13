using Cai;
using CAI_Project_1.Features.Todo;

namespace CAI_Project_1.Features.Todo;

[Mutation<Todo>]
public record CreateTodo(string Title, string Description);

[Mutation<Todo>]
public record UpdateTodo(int Id, string Title, string Description, bool IsCompleted);


[Mutation<bool>] 
public record DeleteTodo(int Id);

[Mutation<Todo>]
public record ToggleTodoStatus(int Id);