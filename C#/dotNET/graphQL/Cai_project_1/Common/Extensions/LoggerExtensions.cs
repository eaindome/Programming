using App.Features.Observability;
using System.Runtime.CompilerServices;

namespace App.Common.Extensions;



public static class LoggerExtensions
{
    public static void logActionError<T, TInput>(this ILogger<T> logger, TInput input, Exception e, bool logRequest = true, string? action = null)
    {
        action ??= typeof(TInput).Name;
        if (logRequest)
        {
            if (input is ISensitive<TInput> s)
            {
                input = s.desensitize();
            }
            logger.LogError(e, "{Task} with request {@input} failed with: {error}", action, input, e.sanitize());
        }
        else
        {
            logger.LogError(e, "{Task} failed with: {error}", action, e.sanitize());
        }
    }
    public static void logActionError<T, TInput>(this ILogger<T> logger, AuthContext authContext, TInput input, Exception e, bool logRequest = true, string? action = null) => logActionError(logger, authContext.username ?? "", input, e, logRequest, action);
    public static void logActionError<T, TInput>(this ILogger<T> logger, string username, TInput input, Exception e, bool logRequest = true, string? action = null)
    {
        action ??= typeof(TInput).Name;
        if (logRequest)
        {
            if (input is ISensitive<TInput> s)
            {
                input = s.desensitize();
            }
            logger.LogError(e, "[{user}] {action} with request {@input} failed with: {error}", username, action, input, e.GetBaseException().Message);
        }
        else
        {
            logger.LogError(e, "[{user}] {action} failed with: {error}", username, action, e.GetBaseException().Message);
        }
    }
    public static void logActionError<T>(this ILogger<T> logger, Exception e, [CallerMemberName] string? action = null)
    {
        logger.LogError(e, "{Task} failed with: {error}", action, e.GetBaseException().Message);
    }
    public static void logActionError<T>(this ILogger<T> logger, string username, Exception e, [CallerMemberName] string? action = null)
    {
        logger.LogError(e, "[{user}] {Task} failed with: {error}", username, action, e.GetBaseException().Message);
    }
    public static void logActionInfo<T, TInput, TOutput>(this ILogger<T> logger, string username, TInput input, TOutput output, bool logRequest = true, string? message = null, string? action = null)
    {
        action ??= typeof(TInput).Name;
        if (logRequest)
        {
            if (input is ISensitive<TInput> s)
            {
                input = s.desensitize();
            }
            if (output is ISensitive<TOutput> o)
            {
                output = o.desensitize();
            }
            if (string.IsNullOrWhiteSpace(message))
                logger.LogInformation("[{user}] {Task} with input {@input} completed with: {output}", username, action, input, output);
            else
                logger.LogInformation("[{user}] {Task} with input {@input} completed with: {output}.\n{message}", username, action, input, output, message);
        }
        else if (string.IsNullOrWhiteSpace(message))
        {
            logger.LogInformation("[{user}] {Task} completed successfully", username, action);
        }
        else
        {
            logger.LogInformation("[{user}] {Task} completed with: {message}", username, action, message);
        }
    }
    public static void logActionInfo<T, TInput, TOutput>(this ILogger<T> logger, TInput input, TOutput output, bool logRequest = true, string? message = null, string? action = null)
    {
        action ??= typeof(TInput).Name;
        if (logRequest)
        {
            if (input is ISensitive<TInput> s)
            {
                input = s.desensitize();
            }
            if (output is ISensitive<TOutput> o)
            {
                output = o.desensitize();
            }
            if (string.IsNullOrWhiteSpace(message))
                logger.LogInformation("{Task} with input {@input} completed with: {output}", action, input, output);
            else
                logger.LogInformation("{Task} with input {@input} completed with: {output}.\n{message}", action, input, output, message);
        }
        else if (string.IsNullOrWhiteSpace(message))
        {
            logger.LogInformation("{Task} completed successfully", action);
        }
        else
        {
            logger.LogInformation("{Task} completed with: {message}", typeof(TInput).Name, message);
        }
    }
    public static void logMemberRequest<T, TInput>(this ILogger<T> logger, TInput input, string staffNumber, string? message = null)
    {
        if (input is ISensitive<TInput> s)
        {
            input = s.desensitize();
        }
        if (string.IsNullOrWhiteSpace(message))
            logger.LogInformation("[{staffNumber}] Processing {Task}", staffNumber, input);
        else
            logger.LogInformation("[{staffNumber}] Processing {Task}.\n{message}", staffNumber, input, message);
    }
}