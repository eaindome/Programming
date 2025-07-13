using System.Text.Json;
using System.Text.RegularExpressions;

namespace App.Common;


public static partial class Prelude
{
    public static (IEnumerable<T> leftOnly, IEnumerable<T> inBoth, IEnumerable<U> rightOnly) split<T, U>(this IEnumerable<T> left, IEnumerable<U> right, Func<T, U, bool> isMatch)
    {
        // todo: optimize this
        var leftOnly = left.Where(x => !right.Any(y => isMatch(x, y)));
        var inBoth = left.Where(x => right.Any(y => isMatch(x, y)));
        var rightOnly = right.Where(x => !left.Any(y => isMatch(y, x)));
        return (leftOnly, inBoth, rightOnly);
    }

    public static X pipe<T, X>(this T x, Func<T, X> f) => f(x);
    public static async Task<X> pipe<T, X>(this Task<T> x, Func<T, X> f)
    {
        var y = await x;
        return f(y);
    }
    public static async Task<X> pipe<T, X>(this Task<T> x, Func<T, Task<X>> f)
    {
        var y = await x;
        return await f(y);
    }
    public static async Task<(T? result, Exception? error)> @catch<T>(this Task<T> x)
    {
        try
        {
            return (await x, default);
        }
        catch (Exception e)
        {
            return (default, e);
        }
    }
    public static void pipe<T>(this T x, Action<T> f) => f(x);

    public static IEnumerable<X> map<T, X>(this IEnumerable<T> xs, Func<T, X> f) =>
        xs.Select(f);
    public static async Task<X> mapIfNotNull<T, X>(this Task<T> x, Func<T, X> f, X nullValue = default)
    {
        var y = await x;
        if (y == null) return nullValue;
        return f(y);
    }
    public static void iter<T>(this IEnumerable<T> xs, Action<T> f)
    {
        foreach (var x in xs) f(x);
    }
    public static void iter<T>(this IEnumerable<T> xs, Action<T, int> f)
    {
        var i = 0;
        foreach (var x in xs) f(x, i++);
    }
    public static async Task iter<T>(this IEnumerable<T> xs, Func<T, Task> f)
    {
        foreach (var x in xs)
            await f(x);
    }
    public static async Task iter<T>(this IEnumerable<T> xs, Func<T, int, Task> f)
    {
        var i = 0;
        foreach (var x in xs)
            await f(x, i++);
    }
    public static bool hasAny<T>(this IEnumerable<T> src, params T[] values)
    {
        foreach (var value in values)
        {
            if (src.Contains(value)) return true;
        }
        return false;
    }
    public static bool hasAny<T>(this IEnumerable<T> xs, params IEnumerable<T>[] values)
    {
        foreach (var x in xs)
        {
            foreach (var vs in values)
            {
                if (vs.Contains(x)) return true;
            }
        }
        return false;
    }
    public static async Task<(T? value, Exception? error)> tryCatch<T>(this Task<T> task)
    {
        try
        {
            return (await task, default);
        }
        catch (Exception e)
        {
            return (default, e);
        }
    }
    public static T? toType<T>(this JsonDocument? json) => json == null ? default : JsonSerializer.Deserialize<T>(json);


    public static double? asDouble(this string src)
    {
        if (double.TryParse(src?.Replace(",", ""), out var result)) return result;
        return null;
    }

    public static decimal? asDecimal(this string src)
    {
        if (decimal.TryParse(src?.Replace(",", ""), out var result)) return result;
        return null;
    }

    public static int? asInt(this string src)
    {
        if (int.TryParse(src?.Replace(",", ""), out var result)) return result;
        return null;
    }

    public static DateTime? asDate(this string src)
    {
        if (DateTime.TryParseExact(src, ["dd-MMM-yyyy", "d-MMM-yyyy"], null, System.Globalization.DateTimeStyles.None, out var result)) return result;
        return null;
    }


    private static readonly Random random = new();
    public static Task waitForMs(this int durationMs, int minValue = 1000, int maxValue = 60000)
    {
        if (durationMs <= 0)
        {
            durationMs = random.Next(minValue, maxValue);
        }
        return Task.Delay(durationMs);
    }
    public static Task randomWaitMs(this int maxDurationMs, int minDurationMs = 1)
    {
        if (maxDurationMs <= 0) return Task.CompletedTask;
        return waitForMs(0, minDurationMs, maxDurationMs);
    }

    public static async Task<(T[]? result, Exception? error)> whenAll<T>(this IEnumerable<Task<T>> tasks)
    {
        try
        {
            return (await Task.WhenAll(tasks), default);
        }
        catch (Exception e)
        {
            return (default, e);
        }
    }

    public static string? toSentenceCase(this string? text)
    {
        if (text == null) return text;
        if (text.Length == 1) return text.ToUpper();
        return text[..1].ToUpper() + text[1..].ToLower();
    }

    public static string? normalize(this string? text)
    {
        if (text == null) return text;
        if (string.IsNullOrWhiteSpace(text)) return "";
        return new string(text.Normalize(System.Text.NormalizationForm.FormD)
            .Where(x => x < 128)
            .ToArray());
    }

    public static string? normalizeSpaces(this string? text)
    {
        if (text == null) return text;
        return FindSpacesRegex().Replace(text, " ");
    }

    [GeneratedRegex(@"\s+")]
    private static partial Regex FindSpacesRegex();
}