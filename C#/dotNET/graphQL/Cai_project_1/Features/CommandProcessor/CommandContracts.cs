namespace App.Features.CommandProcessor;


public interface ICommandSerializer
{
    public object deserialize(string json);
}

public interface IExternalCommand
{
    string name { get; }
    string serialize();
}

public interface IRequiresStream
{
    public Stream stream { get; set; }
}

public interface IRequiresUserId
{
    public long userId { get; set; }
}

public interface ICommandTokenGenerator
{
    CommandToken generate(string scope, Dictionary<string, string> otherValues);
    string fromCommand<T>(T args, long userId) where T : IExternalCommand;
    (CommandConfig<object>? cmd, string? error) toCommand(string token);
}


public record CommandToken(string token, DateTime expiry);