namespace App.Features.Reports;



public record Report(long id, string name, string description, string filterForm, bool isActive, string category);

public enum ReportRendererType
{
    DesignedBased, QueryBased
}


public class UnknownReportFormatException : Exception
{
    public UnknownReportFormatException(string format) : base($"Unknown report format: {format}")
    {
    }
}