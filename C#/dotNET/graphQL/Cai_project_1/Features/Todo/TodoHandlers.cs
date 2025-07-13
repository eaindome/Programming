using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using App.Data;
using System.Reflection.Metadata.Ecma335;

namespace App.Features.Todo;

public class TodoHandlers
{
    public async Task<Todo> Handle(CreateTodo input, DataContext db, CancellationToken ct)
    {
        var todo = new Todo
        {
            Title = input.Title,
            Description = input.Description,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        db.Todos.Add(todo);
        await db.SaveChangesAsync(ct);

        return todo;
    }

    public async Task<Todo> Handle(UpdateTodo input, DataContext db, CancellationToken ct)
    {
        var todo = await db.Todos.FindAsync(new object[] { input.Id }, ct);
        if (todo == null)
        {
            throw new Exception($"Todo with ID {input.Id} not found.");
        }

        todo.Title = input.Title;
        todo.Description = input.Description;
        todo.IsCompleted = input.IsCompleted;

        await db.SaveChangesAsync(ct);
        return todo;
    }

    public async Task<Todo> Handle(DeleteTodo input, DataContext db, CancellationToken ct)
    {
        var todo = await db.Todos.FindAsync(new object[] { input.Id }, ct);
        if (todo == null)
            throw new Exception($"Todo with ID {input.Id} not found.");

        db.Todos.Remove(todo);
        await db.SaveChangesAsync(ct);
        return todo;
    }

    public async Task<Todo> Handle(ToggleTodoStatus input, DataContext db, CancellationToken ct)
    {
        var todo = await db.Todos.FindAsync(new object[] { input.Id }, ct)
            ?? throw new Exception($"Todo with ID {input.Id} not found.");

        todo.IsCompleted = !todo.IsCompleted;
        await db.SaveChangesAsync(ct);
        return todo;
    }
}