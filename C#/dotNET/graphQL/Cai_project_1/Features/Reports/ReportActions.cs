using App.Common;
using App.Data;
using App.Features.CommandProcessor;
using App.Features.Observability;
using Cai;
using Cai.Reporting;
using System.Text.Json;

namespace App.Features.Reports;



[Queries]
public partial class ReportQueries
{
    [Error<GeneralException>]
    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<ReportDefinition> readReports(ReadReports input, DataContext db)
    {
        var q = db.reportDefinitions.AsQueryable();
        if (input.isActive != null) q = q.Where(x => x.active == input.isActive);
        return q;
    }
    public async Task<CallResult<string>> prepareReport(GenerateReport.GenerateReportInput input, [Service] ExternalCommandService commandProcessor, AuthContext authContext)
    {
        // todo: not implemented
        //if (input.runInBackground)
        //{
        //    // todo: save this command somewhere
        //    return new() { success = true, message = "Report Queued successfully. You will be notified when it is done" };
        //}
        var request = new GenerateReport{ input = input };
        return CallResult<string>.ok(commandProcessor.commandToUrl(authContext.userId, request), "Request processed successfully");
    }
}



public record ReadReports(bool? isActive);
[Query<List<Report>>]
public record GetMyReports();
[Query<CallResult<List<ReportParameter>>>]
public record GetReportParametersFromFile(IFile reportFile);
[Query<CallResult<List<ReportParameter>>>]
public record GetReportParameters(string definition);

[Mutation<CallResult>]
public record CreateReport(string name, string description, string folder, IFile reportFile, string filterFormDefinition, ReportRendererType renderer);
[Mutation<CallResult>]
public record UpdateReport(string name, string description, string folder, IFile? reportFile, string filterFormDefinition, ReportRendererType renderer)
{
    public long id { get; set; }
}
[Mutation<CallResult>]
public record SaveReport(string name, string description, string folder, IFile? reportFile, string filterFormDefinition, ReportRendererType renderer)
{
    public long? id { get; set; }
}
[Mutation<CallResult>]
public record DeleteReport(long id);


public record GenerateReport : IExternalCommand, ICommandSerializer, IRequiresStream, IRequiresUserId
{
    public required GenerateReportInput input { get; set; }
    public string name => nameof(GenerateReport);

    public Stream stream { get; set; }
    public long userId { get { return input?.userId ?? 0; } set { input.userId = value; } }

    public string serialize() => JsonSerializer.Serialize(input);
    public object deserialize(string json)
    {
        var parsed = JsonSerializer.Deserialize<GenerateReportInput>(json)!;
        return new GenerateReport { input = parsed };
    }
    public record GenerateReportInput
    {
        public long reportId { get; set; }
        public long? userId { get; set; }
        public JsonElement? filter { get; set; }
        public OutputFormat outputFormat { get; set; }
        public bool runInBackground { get; set; }
    }
}