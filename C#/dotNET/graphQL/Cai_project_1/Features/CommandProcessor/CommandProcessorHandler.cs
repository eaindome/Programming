using App.Common;
using App.Features.Observability;

namespace App.Features.CommandProcessor;

public class CommandProcessorHandler
{
    public async Task<CallResult<string>> Handle(CommandToUrl message, ExternalCommandService commandService, AuthContext authContext)
    {
        if (message.command is IExternalCommand command)
        {
            return CallResult<string>.ok(commandService.commandToUrl(authContext.userId, command), "Request processed successfully");
        }
        return new() { message = "Type of command is not supported" };
    }
}
