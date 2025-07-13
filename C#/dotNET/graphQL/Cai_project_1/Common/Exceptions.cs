namespace App.Common;


public class GeneralException : Exception
{
    public GeneralException(string message) : base(message) { }
}

public class HttpException(string message, string? requestBody, string? responseBody) : Exception(message)
{
    public string? requestBody { get; } = requestBody;
    public string? responseBody { get; } = responseBody;
}