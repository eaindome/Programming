namespace App.Features.Security;



public static class Permissions
{
    public static readonly string[] all =
    [
        "ReadUsers", "CreateUser", "UpdateUser", "DeleteUser", "ActivateUser", "DeactivateUser",
        "ReadRoles", "CreateRole", "UpdateRole", "DeleteRole",
        "ReadPermissions",
        "ReadDepartments", "CreateDepartment", "UpdateDepartment", "DeleteDepartment",

        "ReadDashboards", "CreateDashboard", "UpdateDashboard", "DeleteDashboard", "ActivateDashboard", "DeactivateDashboard", "View Dashboards", "Manage Dashboards",

        "View User Statuses", "Manage User Statuses",

        "CreateReport", "ReadReports", "UpdateReports", "DeleteReport"
    ];
}
