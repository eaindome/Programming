using Microsoft.AspNetCore.Mvc;
using Wolverine;

namespace App.Features.CommandProcessor;





[Route("/api/commands")]
[ApiController]
public class CommandsController : ControllerBase
{
    private readonly ICommandTokenGenerator commandTokenGenerator;
    private readonly IMessageBus bus;

    public CommandsController(ICommandTokenGenerator commandTokenGenerator, IMessageBus bus)
    {
        this.commandTokenGenerator = commandTokenGenerator;
        this.bus = bus;
    }

    [HttpGet("process")]
    public async Task<IActionResult> process(string cmd, string? filename)
    {
        try
        {
            var parsed = commandTokenGenerator.toCommand(cmd);
            if (!string.IsNullOrWhiteSpace(parsed.error))
            {
                return BadRequest(parsed.error);
            }
            // todo: check if user is valid, permission, etc
            var command = parsed.cmd.args;
            var memoryStream = new MemoryStream();
            if (command is IRequiresStream c)
            {
                c.stream = memoryStream; // Response.Body;
            }
            if (command is IRequiresUserId u)
            {
                u.userId = parsed.cmd.userId;
            }
            var resp = await bus.InvokeAsync<ExternalCommandResult>(command);
            if (resp == null)
            {
                // todo: handle when the value is not valid
                return BadRequest("Action was executed but I could not get the expected result. Please contact the administrator");
            }
            if (resp.download || command is IRequiresStream _)
            {
                return File(memoryStream.ToArray(), resp.contentType, filename ?? resp.saveAs);
            }
            if (resp.result is null)
            {
                return BadRequest(resp.message ?? "No valid response received");
            }
            if (resp.result is string s)
            {
                return Content(s);
            }
            return Ok(resp.result);
        }
        catch (Exception e)
        {
            // todo: log this
            return BadRequest(e.GetBaseException().Message);
        }
    }
}