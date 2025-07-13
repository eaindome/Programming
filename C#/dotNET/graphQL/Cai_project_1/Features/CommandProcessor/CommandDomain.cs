using System.Text.Json;

namespace App.Features.CommandProcessor;


public record ExternalCommandResult
{
    public bool success { get; set; }
    public string message { get; set; }
    public object result { get; set; }
    public int code { get; set; }
    public string contentType { get; set; }
    public bool download { get; set; }
    public string saveAs { get; set; }
}

public class CommandConfig<T>
{
    public string type { get; set; }
    public T args { get; set; }
    public long userId { get; set; }
}

public class CommandConfig : CommandConfig<JsonElement>
{
    public T? typedArgs<T>()
    {
        try
        {
            return args.Deserialize<T>();
        }
        catch
        {
            return default;
        }
    }
}