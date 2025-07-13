using App.Common.Extensions;
using App.Common;
using App.Data;
using App.Features.Audit;
using App.Features.Observability;

namespace App.Features.Templates;



public class TemplatesHandler
{
    public static async Task<CallResult> Handle(CreateSmsTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            SmsTemplate entity = new() { category = input.category, isSystemTemplate = input.isSystemTemplate, message = input.message, name = input.name, notes = input.notes, active = input.active };
            db.smsTemplates.Add(entity);
            await db.SaveChangesAsync(cancellationToken);
            db.auditCreate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Sms Template created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(UpdateSmsTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<SmsTemplate>(input.id);
            entity.category = input.category;
            entity.message = input.message;
            entity.isSystemTemplate = input.isSystemTemplate;
            entity.name = input.name;
            entity.notes = input.notes;
            entity.active = input.active;

            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Sms Template updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteSmsTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<SmsTemplate>(input.id);
            db.smsTemplates.Remove(entity);
            db.auditDelete(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Sms Template deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(ActivateSmsTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<SmsTemplate>(input.id);
            entity.active = true;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Sms Template activated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeactivateSmsTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<SmsTemplate>(input.id);
            entity.active = false;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Sms Template deactivated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }

    public static async Task<CallResult> Handle(CreateEmailTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            EmailTemplate entity = new() { category = input.category, isSystemTemplate = input.isSystemTemplate, message = input.message, name = input.name, notes = input.notes, subject = input.subject, active = input.active };
            db.emailTemplates.Add(entity);
            await db.SaveChangesAsync(cancellationToken);
            db.auditCreate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Email Template created successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(UpdateEmailTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // get
            var entity = await db.firstAsync<EmailTemplate>(input.id);
            entity.category = input.category;
            entity.message = input.message;
            entity.isSystemTemplate = input.isSystemTemplate;
            entity.name = input.name;
            entity.notes = input.notes;
            entity.active = input.active;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Email Template updated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeleteEmailTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<EmailTemplate>(input.id);
            db.emailTemplates.Remove(entity);
            db.auditDelete(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Email Template deleted successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(ActivateEmailTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<EmailTemplate>(input.id);
            entity.active = true;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Email Template activated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }
    public static async Task<CallResult> Handle(DeactivateEmailTemplate input, DataContext db, AuthContext authContext, ILogger<TemplatesHandler> logger, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return CallResult.notAuthenticated();
        // todo: permission
        try
        {
            // create
            var entity = await db.firstAsync<SmsTemplate>(input.id);
            entity.active = false;
            db.auditUpdate(entity, entity.name, authContext.userId);
            await db.SaveChangesAsync(cancellationToken);

            return CallResult.ok("Email Template deactivated successfully");
        }
        catch (Exception e)
        {
            logger.logActionError(input, e, true);
            return CallResult.error(e.sanitize());
        }
    }

}