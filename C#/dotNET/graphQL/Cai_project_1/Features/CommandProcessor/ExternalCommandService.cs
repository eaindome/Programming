namespace App.Features.CommandProcessor;



public class ExternalCommandService
{
    private readonly Config config;
    private readonly ICommandTokenGenerator tokenGenerator;

    public ExternalCommandService(IConfiguration configuration,
ICommandTokenGenerator tokenGenerator)
    {
        config = configuration.GetRequiredSection(Config.configKey).Get<Config>()!;
        this.tokenGenerator = tokenGenerator;
    }
    public string commandToUrl<T>(long userId, T command) where T : IExternalCommand
    {
        var token = tokenGenerator.fromCommand(command, userId);
        return $"{config.baseUrl}?cmd={token}";
    }


    public record Config
    {
        internal static string configKey => "commands";
        public string baseUrl { get; set; }
    }
}