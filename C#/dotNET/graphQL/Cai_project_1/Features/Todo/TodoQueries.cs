using Microsoft.EntityFrameworkCore;
using App.Data;
using Cai;
using CAI_Project_1.Data;
using CAI_Project_1.Features.Todo;

namespace CAI_Project_1.Features.Todo;

[Queries]
public partial class TodoQueries
{
    // [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 10)]
    // [UseProjection]
    // [UseFiltering]
    // [UseSorting]
    public IQueryable<Todo> GetAllTodos([Service] DataContext db)
    {
        return db.Todos.AsQueryable();
    }

    public async Task<Todo?> GetTodoById([Service] DataContext db, int id)
    {
        return await db.Todos.FindAsync(id);
    }

    public IQueryable<Todo> GetCompletedTodos([Service] DataContext db)
    {
        return db.Todos.Where(t => t.IsCompleted);
    }
}