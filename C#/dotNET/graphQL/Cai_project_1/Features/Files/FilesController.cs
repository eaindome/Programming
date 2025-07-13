using App.Common.Extensions;
using App.Features.CommandProcessor;
using Cai.Reporting;
using Microsoft.AspNetCore.Mvc;
using Wolverine;

namespace App.Features.Files;

[ApiController]
[Route("files")]
public class FilesController : ControllerBase
{
    private readonly IHttpClientFactory httpClientFactory;
    private readonly ReportParser reportParser;
    private readonly ReportRenderer reportRenderer;
    private readonly ILogger<FilesController> logger;

    public FilesController(IHttpClientFactory httpClientFactory, ReportParser parser, ReportRenderer renderer, ILogger<FilesController> logger)
    {
        this.httpClientFactory = httpClientFactory;
        reportParser = parser;
        reportRenderer = renderer;
        this.logger = logger;
    }

    [HttpGet("download")]
    public async Task<IActionResult> download(string url, string? name)
    {
        try
        {
            var req = new HttpRequestMessage(HttpMethod.Get, url);
            req.Headers.Add("User-Agent", "Cai_project_1");

            var client = httpClientFactory.CreateClient();
            var resp = await client.SendAsync(req);
            var stream = await resp.Content.ReadAsStreamAsync();

            name ??= System.IO.Path.GetFileName(url);
            if (!System.IO.Path.HasExtension(name))
            {
                name += System.IO.Path.GetExtension(url);
            }
            Response.Headers["Content-Disposition"] = $"attachment; filename={name}";

            return new FileStreamResult(stream, resp.Content.Headers.ContentType.MediaType);
        }
        catch (Exception e)
        {
            // todo: log this?
            return BadRequest(e.sanitize());
        }
    }

    [HttpGet("runAction")]
    public async Task<IActionResult> runAction([FromQuery] string action, bool download, string filename, [FromServices] ICommandTokenGenerator tokenGenerator, IMessageBus bus, [FromServices] ILogger<FilesController> logger)
    {
        try
        {
            var parsed = tokenGenerator.toCommand(action);
            if (!string.IsNullOrWhiteSpace(parsed.error))
            {
                return BadRequest(parsed.error);
            }
            // todo: check if user is valid, permission, etc
            var command = parsed.cmd;
            var memoryStream = new MemoryStream();
            if (command is IRequiresStream c)
            {
                c.stream = memoryStream; // Response.Body;
            }
            //if (actionConfig == null) return BadRequest("Invalid action provided");
            //// todo: validate the user id and ensure the right permissions
            //object command = actionConfig.type switch
            //{
            //    nameof(DownloadContributionAdjustmentBatchToStream) => JsonSerializer.Deserialize<DownloadContributionAdjustmentBatchToStream>(actionConfig.args),
            //    nameof() => JsonSerializer.Deserialize<DownloadContributionOffPayrollBatchToStream>(actionConfig.args),
            //    _ => null
            //};
            //if (command == null) return BadRequest("Unknown command specified");
            //var memoryStream = new MemoryStream();
            //if (command is IMessageWithStream c)
            //{
            //    c.stream = memoryStream; // Response.Body;
            //}
            var ret = await bus.InvokeAsync<ExternalCommandResult>(command);
            // todo: get the type, userId and args
            if (ret.success)
            {
                return File(memoryStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
                //return NoContent();
            }
            return BadRequest(ret.message);
        }
        catch (Exception e)
        {
            logger.logActionError(new { action }, e, action: nameof(runAction));
            return BadRequest(e.sanitize());
        }
    }
}