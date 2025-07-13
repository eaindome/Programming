using App.Common.Extensions;
using App.Common;
using App.Data;
using App.Features.CommandProcessor;
using App.Features.Observability;
using Cai.Reporting;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using App.Features.Audit;

namespace App.Features.Reports;



public class ReportsHandler
{
    public async Task<IQueryable<ReportDefinition>> Handle(ReadReports input, DataContext db, CancellationToken cancellationToken)
    {
        // todo: enforce permissions
        var q = db.reportDefinitions.AsQueryable();
        if (input.isActive != null) q = q.Where(x => x.active == input.isActive);
        return q;
        //   .Select(x => new Report(x.id, x.name, x.description, x.formDefinition, x.active, x.category));
    }
    public async Task<List<Report>> Handle(GetMyReports _, DataContext db, AuthContext authContext, CancellationToken cancellationToken)
    {
        if (!authContext.isLoggedIn) return [];
        var user = authContext.currentUser;
        if (user == null) return [];
        var reportIds = await db.roles
            .Where(x => x.id == user.roleId)
            .Select(x => x.reports)
            .FirstOrDefaultAsync(cancellationToken);
        // todo: enforce permissions
        return await db.reportDefinitions.Where(x => x.active && reportIds.Contains(x.id))
            .Select(x => new Report(x.id, x.name, x.description, x.formDefinition, x.active, x.category))
            .ToListAsync(cancellationToken);
    }

    public async Task<CallResult<List<ReportParameter>>> Handle(GetReportParameters input, ReportParser parser)
    {
        // todo: enforce permissions
        var report = await parser.parseFromText("", input.definition);
        if (report.IsError) return new() { success = false, message = report.FirstError.Description };
        return new() { success = true, message = "Successful", result = report.Value.parameters };
    }

    public async Task<CallResult<List<ReportParameter>>> Handle(GetReportParametersFromFile input, ReportParser parser)
    {
        using var stream = input.reportFile.OpenReadStream();
        using var reader = new StreamReader(stream);
        // todo: fail if file is too large
        var content = reader.ReadToEnd();
        return await Handle(new GetReportParameters(content), parser);
    }

    public async Task<CallResult> Handle(SaveReport input, DataContext db, ReportParser parser, CancellationToken cancellationToken)
    {
        // todo: enforce permissions
        try
        {
            if (string.IsNullOrWhiteSpace(input.filterFormDefinition))
            {
                input = input with { filterFormDefinition = "{}" };
            }
            ReportDefinition? existing = null;
            if (input.id.HasValue)
            {
                existing = await db.reportDefinitions.FirstOrDefaultAsync(x => x.id == input.id, cancellationToken); // todo: skip entirely if null
                if (existing == null) return new() { message = "Report was not found. Please try again." };
            }
            if (existing == null) // new 
            {
                if (input.reportFile == null) return new CallResult { message = "No report file attached" };
                using var stream = input.reportFile.OpenReadStream();
                using var reader = new StreamReader(stream);
                var reportContent = await reader.ReadToEndAsync(cancellationToken);
                var report = await parser.parseFromText("", reportContent);
                if (report.IsError) return new CallResult { message = report.FirstError.Description };

                // ensure filter form is valid
                var _ = JsonSerializer.Deserialize<JsonDocument>(input.filterFormDefinition); // will throw error if invalid

                var parametersJson = JsonSerializer.Serialize(report.Value.parameters);
                ReportDefinition entry = new() { active = true, formDefinition = input.filterFormDefinition, name = input.name, description = input.description, reportDefinition = JsonSerializer.Serialize(report.Value), parameters = parametersJson, category = input.folder, renderer = input.renderer };
                db.reportDefinitions.Add(entry);
            }
            else
            {
                existing.formDefinition = input.filterFormDefinition;
                existing.name = input.name;
                existing.description = input.description;
                existing.renderer = input.renderer;
                if (input.reportFile != null)
                {
                    using var stream = input.reportFile.OpenReadStream();
                    using var reader = new StreamReader(stream);
                    var reportContent = await reader.ReadToEndAsync(cancellationToken);
                    var report = await parser.parseFromText("", reportContent);
                    if (report.IsError) return new CallResult { message = report.FirstError.Description };

                    // ensure filter form is valid
                    var _ = JsonSerializer.Deserialize<JsonDocument>(input.filterFormDefinition); // will throw error if invalid

                    var parametersJson = JsonSerializer.Serialize(report.Value.parameters);
                    existing.reportDefinition = JsonSerializer.Serialize(report.Value);
                    existing.parameters = parametersJson;
                }
                existing.category = input.folder;
            }
            await db.SaveChangesAsync(cancellationToken);
            return new CallResult { success = true, message = "Report definition saved successfully" };
        }
        catch (Exception e)
        {
            // todo: log this
            return new CallResult { success = false, message = e.sanitize() };
        }
    }
    public async Task<CallResult> Handle(CreateReport input, DataContext db, ReportParser parser, CancellationToken cancellationToken)
    {
        // todo: enforce permissions
        try
        {
            if (input.reportFile == null) return new CallResult { message = "No report file attached" };
            using var stream = input.reportFile.OpenReadStream();
            using var reader = new StreamReader(stream);
            var reportContent = await reader.ReadToEndAsync(cancellationToken);
            var report = await parser.parseFromText("", reportContent);
            if (report.IsError) return new CallResult { message = report.FirstError.Description };

            // ensure filter form is valid
            var _ = JsonSerializer.Deserialize<JsonDocument>(input.filterFormDefinition); // will throw error if invalid

            var parametersJson = JsonSerializer.Serialize(report.Value.parameters);
            ReportDefinition entry = new() { active = true, formDefinition = input.filterFormDefinition, name = input.name, description = input.description, reportDefinition = JsonSerializer.Serialize(report.Value), parameters = parametersJson, category = input.folder };
            db.reportDefinitions.Add(entry);
            await db.SaveChangesAsync(cancellationToken);
            return new CallResult { success = true, message = "Report definition saved successfully" };
        }
        catch (Exception e)
        {
            // todo: log this
            return new CallResult { success = false, message = e.sanitize() };
        }
    }
    public async Task<CallResult> Handle(UpdateReport input, DataContext db, ReportParser parser, CancellationToken cancellationToken)
    {
        // todo: enforce permissions
        try
        {
            var existing = await db.reportDefinitions.FirstOrDefaultAsync(x => x.id == input.id, cancellationToken); // todo: skip entirely if null
            if (existing == null) return new() { message = "Report was not found. Please try again." };
            existing.formDefinition = input.filterFormDefinition;
            existing.name = input.name;
            existing.description = input.description;
            if (input.reportFile != null)
            {
                using var stream = input.reportFile.OpenReadStream();
                using var reader = new StreamReader(stream);
                var reportContent = await reader.ReadToEndAsync(cancellationToken);
                var report = await parser.parseFromText("", reportContent);
                if (report.IsError) return new CallResult { message = report.FirstError.Description };

                // ensure filter form is valid
                var _ = JsonSerializer.Deserialize<JsonDocument>(input.filterFormDefinition); // will throw error if invalid

                var parametersJson = JsonSerializer.Serialize(report.Value.parameters);
                existing.reportDefinition = JsonSerializer.Serialize(report.Value);
                existing.parameters = parametersJson;
            }
            existing.category = input.folder;
            await db.SaveChangesAsync(cancellationToken);
            return new CallResult { success = true, message = "Report definition saved successfully" };
        }
        catch (Exception e)
        {
            // todo: log this
            return new CallResult { success = false, message = e.sanitize() };
        }
    }

    public async Task<CallResult> Handle(DeleteReport input, DataContext db, CancellationToken cancellationToken)
    {
        // todo: permissions
        try
        {
            var existing = await db.reportDefinitions.FirstOrDefaultAsync(x => x.id == input.id, cancellationToken);
            if (existing == null) return new CallResult { success = true, message = "Report not found so no action taken" };
            db.Remove(existing);
            await db.SaveChangesAsync(cancellationToken);
            return new CallResult { success = true, message = "Report delete successfully" };
        }
        catch (Exception e)
        {
            // todo: log this
            return new CallResult { success = false, message = e.sanitize() };
        }
    }

    public async Task<ExternalCommandResult> Handle(GenerateReport input, DataContext db, ReportRenderer renderer, QueuedReportProcessorService queuedReportProcessorService, AuthContext authContext, CancellationToken cancellationToken)
    {
        // todo: ensure the user can generate this report based on the role reports
        try
        {
            var reportDefn = await db.reportDefinitions.FirstOrDefaultAsync(x => x.id == input.input.reportId, cancellationToken);
            if (reportDefn == null) return new() { message = "Report not found" };

            // todo: background processing not implemented at the moment
            //if (input.input.runInBackground)
            //{
            //    // ensure that no one than 1 instance of the same report request is queue
            //    QueuedReport? queuedReport = await db.queuedReports.FirstOrDefaultAsync(x => x.userId == authContext.userId && x.reportId == input.input.reportId, cancellationToken);
            //    if (queuedReport != null && queuedReport.status is QueuedReportStatus.Pending or QueuedReportStatus.Processing or QueuedReportStatus.PendingEmail)
            //    {
            //        return new() { message = $"You already have a request with ID: QR{queuedReport.id:00000000} with status {queuedReport.status}. Please wait for it to be completed first." };
            //    }
            //    queuedReport = new() { notes = "", outputFormat = input.input.outputFormat, reportId = input.input.reportId, status = QueuedReportStatus.Pending, userId = authContext.userId, filterJson = input.input.filter == null ? null : JsonSerializer.Serialize(input.input.filter.Value), active = true };
            //    db.queuedReports.Add(queuedReport);
            //    db.queuedReportFeeds.Add(new() { request = queuedReport, title = $"{reportDefn.name} by {authContext.name}", activity = QueuedReportEvent.Created, notes = "", type = EventType.Information, userId = authContext.userId });
            //    await db.SaveChangesAsync(cancellationToken);
            //    queuedReportProcessorService.notify();
            //    return new() { success = true, message = $"Report Queued with ID: QR{queuedReport.id:00000000}. You will be notified when ready." };
            //}

            var report = JsonSerializer.Deserialize<ReportEntry>(reportDefn.reportDefinition);

            JsonDocument? filter = null;
            if (input.input.filter != null)
            {
                filter = input.input.filter.Value.Deserialize<JsonDocument>();
            }
            var ret = await renderer.renderToStream(report, filter, input.input.outputFormat, input.stream);
            if (ret.IsError) return new() { message = ret.FirstError.Description };

            return new() { success = true, message = "Report generated successfully", contentType = ret.Value, code = 200 };
        }
        catch (Exception e)
        {
            // todo: log this
            return new() { message = e.sanitize() };
        }
    }
}