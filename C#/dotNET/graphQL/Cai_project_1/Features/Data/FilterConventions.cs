using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Language;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;

namespace App.Features.Data;



public class CaseInsensitiveFilteringConvertion : FilterConvention
{
    protected override void Configure(IFilterConventionDescriptor descriptor)
    {
        descriptor.AddDefaults();
        descriptor.Provider(new QueryableFilterProvider(x => x
            .AddDefaultFieldHandlers()
            .AddFieldHandler<QueryableStringInvariantContainsHandler>()
            .AddFieldHandler<QueryableStringInvariantEqualsHandler>()
            .AddFieldHandler<QueryableStringInvariantStartsWithHandler>()
            .AddFieldHandler<QueryableStringInvariantEndsWithHandler>()
            ));
    }
}




public partial class QueryableStringInvariantBaseHandler : QueryableStringOperationHandler
{
    [GeneratedRegex(@"\s+")]
    public static partial Regex WhiteSpaceRegex();
    public static readonly MethodInfo _ilike = typeof(NpgsqlDbFunctionsExtensions).GetMethod("ILike",
            [typeof(DbFunctions), typeof(string), typeof(string)])!;
    private static readonly Regex sWhitespace = WhiteSpaceRegex();

    private readonly int operation;
    private readonly string before;
    private readonly string after;
    private readonly bool exact;

    public QueryableStringInvariantBaseHandler(InputParser inputParser, int operation, bool anyBefore, bool anyAfter, bool exact)
        : base(inputParser)
    {
        this.operation = operation;
        before = anyBefore ? "%" : "";
        after = anyAfter ? "%" : "";
        this.exact = exact;
    }
    protected override int Operation => operation;

    public override Expression HandleOperation(
        QueryableFilterContext context,
        IFilterOperationField field,
        IValueNode value,
        object parsedValue)
    {
        Expression property = context.GetInstance();
        var source = Expression.Constant(EF.Functions);
        if (parsedValue is string str)
        {
            var pattern = exact ? str : sWhitespace.Replace(str, "%");
            pattern = $"{before}{pattern}{after}";

            return Expression.AndAlso(
                Expression.NotEqual(property, Expression.Constant(null, typeof(object))),
                Expression.Call(
                    null,
                    _ilike,
                    source,
                    property,
                    CreateParameter(pattern, property.Type)
                )
            );
        }
        throw new InvalidOperationException();
    }

    private static Expression CreateAndConvertParameter<T>(object value)
    {
        Expression<Func<T>> lambda = () => (T)value;
        return lambda.Body;
    }

    private static Expression CreateParameter(object? value, Type type)
        => (Expression)_createAndConvert
            .MakeGenericMethod(type)
            .Invoke(null,
                [value])!;

    private static readonly MethodInfo _createAndConvert =
        typeof(FilterExpressionBuilder)
            .GetMethod(nameof(CreateAndConvertParameter), BindingFlags.NonPublic | BindingFlags.Static)!;


}

public class QueryableStringInvariantContainsHandler : QueryableStringInvariantBaseHandler
{
    public QueryableStringInvariantContainsHandler(InputParser inputParser) : base(inputParser, DefaultFilterOperations.Contains, true, true, false) { }
}
public class QueryableStringInvariantStartsWithHandler : QueryableStringInvariantBaseHandler
{
    public QueryableStringInvariantStartsWithHandler(InputParser inputParser) : base(inputParser, DefaultFilterOperations.StartsWith, false, true, false) { }
}
public class QueryableStringInvariantEndsWithHandler : QueryableStringInvariantBaseHandler
{
    public QueryableStringInvariantEndsWithHandler(InputParser inputParser) : base(inputParser, DefaultFilterOperations.EndsWith, true, false, false) { }
}
public class QueryableStringInvariantEqualsHandler : QueryableStringInvariantBaseHandler
{
    public QueryableStringInvariantEqualsHandler(InputParser inputParser) : base(inputParser, DefaultFilterOperations.Equals, false, false, true) { }
}

// todo: handle not for all above