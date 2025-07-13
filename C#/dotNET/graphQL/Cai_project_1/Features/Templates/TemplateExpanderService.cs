using App.Common.Extensions;
using App.Data;
using Cottle;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace App.Features.Templates;



public class TemplateExpanderService
{
    private readonly IDbContextFactory<DataContext> dbFactory;
    private readonly ILogger<TemplateExpanderService> logger;
    private Dictionary<string, IDocument> smsDocuments { get; set; }
    private Dictionary<string, IDocument> emailDocuments { get; set; }

    public TemplateExpanderService(IDbContextFactory<DataContext> dbFactory, ILogger<TemplateExpanderService> logger)
    {
        this.dbFactory = dbFactory;
        this.logger = logger;
    }

    public async Task<Exception?> init(CancellationToken cancellationToken)
    {
        try
        {
            await refreshTemplates(cancellationToken);
            return default;
        }
        catch (Exception e)
        {
            logger.logActionError(new { }, e, action: "Init Templates");
            return e;
        }
    }
    private async Task refreshTemplates(CancellationToken cancellationToken)
    {
        try
        {
            using var db = await dbFactory.CreateDbContextAsync(cancellationToken);
            smsDocuments = db.smsTemplates.Where(x => x.active)
                .AsEnumerable()
                .Select(sms =>
                {
                    try
                    {
                        return (sms.name, document: Document.CreateDefault(sms.message).DocumentOrThrow);
                    }
                    catch (Exception e)
                    {
                        logger.logActionError(new { sms.message, type = "SmsTemplate" }, e, action: "Error parsing sms template");
                        return ("", default);
                    }
                })
                .Where(x => x.name != "")
                .DistinctBy(x => x.name)
                .ToDictionary(x => x.name, x => x.document, StringComparer.OrdinalIgnoreCase);
            emailDocuments = db.emailTemplates
                .AsEnumerable()
                .Select(sms =>
                {
                    try
                    {
                        return (sms.name, document: Document.CreateDefault(sms.message).DocumentOrThrow);
                    }
                    catch (Exception e)
                    {
                        logger.logActionError(new { sms.message, type = "SmsTemplate" }, e, action: "Error parsing sms template");
                        return ("", default);
                    }
                })
                .Where(x => x.name != "")
                .DistinctBy(x => x.name)
                .ToDictionary(x => x.name, x => x.document, StringComparer.OrdinalIgnoreCase);
        }
        catch (Exception e)
        {
            logger.logActionError(new { }, e, action: "refreshTemplates");
        }
    }

    public ErrorOr<string> expand(string template, Dictionary<Value, Value> state)
    {
        try
        {
            var document = Document.CreateDefault(template).DocumentOrThrow; //? can this be cached
            var context = Context.CreateBuiltin(state);

            return document.Render(context);
        }
        catch (Exception e)
        {
            return ErrorOr.Error.Failure(description: e.GetBaseException().Message);
        }
    }
}
