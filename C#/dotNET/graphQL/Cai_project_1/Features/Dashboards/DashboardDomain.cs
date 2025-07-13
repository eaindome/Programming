namespace App.Features.Dashboards;


public record DashboardIntEntry(string name, int value);
public record DashboardIntEntry2(string parent, string child, int value);