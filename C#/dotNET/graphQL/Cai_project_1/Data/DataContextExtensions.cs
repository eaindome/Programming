using App.Common;
using App.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace App.Data;


public static class DataContextExtensions
{
    public static async Task<T> firstAsync<T>(this DataContext db, long id) where T : class, IHasId
    {
        try
        {
            return await db.Set<T>().FirstAsync(x => x.id == id);
        }
        catch (Exception e)
        {
            throw new GeneralException("Not found");
        }
    }

    public static IQueryable<T> whereAny<T>(this IQueryable<T> source, params (string field, object value, WhereOperator op)[][] filterss)
    {
        var parameter = Expression.Parameter(typeof(T), "x");
        Expression body = null!;

        foreach (var filters in filterss.Where(xs => xs.Any()))
        {
            Expression andBody = null!;
            foreach (var filter in filters)
            {
                var properties = filter.field.Split('.');
                var property = Expression.Property(parameter, properties[0]);
                for (var i = 1; i < properties.Length; i++)
                {
                    property = Expression.PropertyOrField(property, properties[i]);
                }
                MethodInfo? containsMethod = null;
                Type valueType = property.Type;
                if (filter.op == WhereOperator.Contains)
                {
                    if (property.Type.IsGenericType && property.Type.GenericTypeArguments.Any())
                    {
                        valueType = property.Type.GenericTypeArguments[0];
                    }
                    containsMethod = property.Type.GetMethod("Contains", [valueType]);
                }
                var equal = filter.op switch
                {
                    WhereOperator.Equals => (Expression)Expression.Equal(property, Expression.Constant(filter.value, valueType)),
                    WhereOperator.Contains => Expression.Call(property, containsMethod!, Expression.Constant(filter.value, valueType)),
                    _ => throw new InvalidOperationException(filter.op.ToString())
                };
                if (andBody == null) andBody = equal;
                else andBody = Expression.AndAlso(andBody, equal);
            }
            if (body == null) body = andBody;
            else body = Expression.OrElse(body, andBody);
        }
        var lambda = Expression.Lambda<Func<T, bool>>(body, parameter);
        return source.Where(lambda);
    }

    public static IQueryable<T> whereAny<T>(this IQueryable<T> source, params (string field, object value)[] filters)
    {
        var parameter = Expression.Parameter(typeof(T), "x");
        Expression body = null!;

        foreach (var filter in filters)
        {
            var properties = filter.field.Split('.');
            var property = Expression.Property(parameter, properties[0]);
            for (var i = 1; i < properties.Length; i++)
            {
                property = Expression.PropertyOrField(property, properties[i]);
            }
            var equal = Expression.Equal(property, Expression.Constant(filter.value, property.Type));
            if (body == null) body = equal;
            else body = Expression.OrElse(body, equal);
        }
        var lambda = Expression.Lambda<Func<T, bool>>(body, parameter);
        return source.Where(lambda);
    }
    public static IQueryable<T> whereAny<T>(this IQueryable<T> source, params Expression[] filters)
    {
        if (!filters.Any()) return source;
        var parameter = Expression.Parameter(typeof(T), "x");
        Expression body = filters[0];

        for (var i = 1; i < filters.Length; i++)
        {
            body = Expression.OrElse(body, filters[0]);
        }
        var lambda = Expression.Lambda<Func<T, bool>>(body, parameter);
        return source.Where(lambda);
    }
}


public enum WhereOperator { Equals, Contains }