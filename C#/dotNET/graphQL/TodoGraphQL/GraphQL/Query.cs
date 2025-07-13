using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Data;
using TodoGraphQL.Data;
using TodoGraphQL.Models;

namespace TodoGraphQL.GraphQL;

public class Query
{
    [UseDbContext(typeof(AppDbContext))]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Todo> GetTodos([ScopedService] AppDbContext context) =>
        context.Todos;
}
