using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace App.Common.Extensions;

public static class WebApplicationExtensions
{
    public static IApplicationBuilder useCors(this WebApplication app)
    {
        return app.UseCors(x =>
        {
            var corsConfig = app.Configuration.GetSection(CorsConfig.ConfigName).Get<CorsConfig>();
            var permitAll = corsConfig!.permittedOrigins.Contains("*");

            x.AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .SetIsOriginAllowed(x =>
                {
                    return true; // todo: permitAll || corsConfig.permittedOrigins.Contains(x);
                });
        });
    }
    public static WebApplicationBuilder addAuthentication(this WebApplicationBuilder builder)
    {
        // todo: restructure this
        builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var config = builder.Configuration.GetSection("jwt");
                options.Authority = config["iss"];
                options.Audience = config["aud"];
                options.RequireHttpsMetadata = config.GetValue<bool>("requireHttpsMetadata");
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = c =>
                    {
                        return Task.CompletedTask; // todo:
                        c.NoResult();
                        c.Response.StatusCode = 401;
                        c.Response.ContentType = "text/plain";
                        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development)
                        {
                            return c.Response.WriteAsync(c.Exception.ToString());
                        }
                        return c.Response.WriteAsync("An error occurred processing your authentication.");
                    }
                };
            });
        return builder;
    }
}
