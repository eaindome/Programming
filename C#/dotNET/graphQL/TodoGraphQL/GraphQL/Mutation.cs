using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Data;
using TodoGraphQL.Data;
using TodoGraphQL.Models;

namespace TodoGraphQL.GraphQL;

public class Mutation
{
    [UseDbContext(typeof(AppDbContext))]
    public async Task<Todo> AddTodoAsync(string title, [ScopedService] AppDbContext context)
    {
        var todo = new Todo { Title = title, IsCompleted = false };
        context.Todos.Add(todo);
        await context.SaveChangesAsync();
        return todo;
    }

    [UseDbContext(typeof(AppDbContext))]
    public async Task<Todo?> ToggleTodoAsync(int id, [ScopedService] AppDbContext context)
    {
        var todo = await context.Todos.FindAsync(id);
        if (todo == null) return null;

        todo.IsCompleted = !todo.IsCompleted;
        await context.SaveChangesAsync();
        return todo;
    }
}
