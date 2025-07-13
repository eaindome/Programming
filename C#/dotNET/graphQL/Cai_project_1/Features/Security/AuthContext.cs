using App.Common;
using App.Data;
using App.Features.UserManagement;
using Microsoft.AspNetCore.Http.Extensions;
using System.Security.Claims;

namespace App.Features.Observability;



public partial class AuthContext
{
    public AuthContext(IHttpContextAccessor http, UserService userService): this(http)
    {
        if (http?.HttpContext == null || http.HttpContext?.User?.Identity?.IsAuthenticated != true)
        {
            isLoggedIn = false;
            username = null;
            url = http?.HttpContext?.Request?.GetDisplayUrl() ?? "";
            return;
        }
        else
        {
            var principal = http.HttpContext.User;
            isLoggedIn = principal.Identity.IsAuthenticated;
            username = principal.FindFirstValue("preferred_username");//username = "fboateng@teachersfund.org.gh";
            //if (long.TryParse(principal.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"), out var uId))
            //    userId = uId;

            if (long.TryParse(principal.FindFirstValue("roleId"), out var rId))
                roleId = rId;
            email = principal.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress") ?? "";
            name = principal.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name") ?? principal.FindFirstValue("name") ?? "";
            scope = principal.FindFirstValue("scope") ?? "";
        }
        url = http.HttpContext?.Request?.GetDisplayUrl() ?? "";
        this.userService = userService;
        // check that the user is valid
        if (isLoggedIn)
        {
            if (userId == 0)
            {
                isLoggedIn = false;
            }
        }
    }

    public string email { get; init; }
    public string name { get; init; }
    public long roleId { get; init; }
    public string url { get; init; }
    public string scope { get; init; }

    private static GeneralException notAuthenticatedException = new GeneralException("Login session has expired");
    private readonly UserService userService;

    internal GeneralException notAuthenticated() => notAuthenticatedException;

    public User? currentUser => userService?.getUser(username);
    public long userId => currentUser?.id ?? 0;
}