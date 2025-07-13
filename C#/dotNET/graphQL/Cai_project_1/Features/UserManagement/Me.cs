namespace App.Data;

public class Me
{
    public long id { get; set; }
    public string role { get; set; }
    public long roleId { get; set; }
    public string department { get; set; }
    public long departmentId { get; set; }
    public string[] permissions { get; set; }
    public UserType type { get; internal set; }
    public long? activeDashboardId { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string middleNames { get; set; }
}
