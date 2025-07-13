using App.Features.Audit;
using App.Features.Security;
using App.Features.UserManagement;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace App.Data;

public static class SetupData
{
    public static IServiceCollection addData(this IServiceCollection services, IConfiguration configuration)
    {
        string connectionString = configuration.GetConnectionString("db")!;
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
        dataSourceBuilder.EnableDynamicJson();
        var ngpsqlDataSource = dataSourceBuilder.Build();
        var efConfig = configuration.GetSection("ef").Get<EfConfig>()!;

        services.AddDbContextFactory<DataContext>((sp, o) =>
        {
            var auditInterceptor = new AuditIntereceptor(sp); // sp.GetRequiredService<AuditIntereceptor>();
            o.UseNpgsql(ngpsqlDataSource, s => s.EnableRetryOnFailure())
                .EnableSensitiveDataLogging(efConfig.enableSensitiveDataLogging)
                .EnableDetailedErrors(efConfig.enableDetailedErrors)
                .AddInterceptors(auditInterceptor);
            //.LogTo(Log.Logger.Information, LogLevel.Information, null)
        });
        //services.AddPooledDbContextFactory<DataContext>((sp, o) =>
        //{
        //    var auditInterceptor = sp.GetRequiredService<AuditIntereceptor>();
        //    o.UseNpgsql(ngpsqlDataSource, s => s.EnableRetryOnFailure())
        //        .EnableSensitiveDataLogging(efConfig.enableSensitiveDataLogging)
        //        .EnableDetailedErrors(efConfig.enableDetailedErrors)
        //        .AddInterceptors(auditInterceptor);
        //    //.LogTo(Log.Logger.Information, LogLevel.Information, null)
        //});
        //services.AddDbContext<DataContext>((sp, o) =>
        //{
        //    var auditInterceptor = sp.GetRequiredService<AuditIntereceptor>();
        //    o.UseNpgsql(ngpsqlDataSource, s => s.EnableRetryOnFailure())
        //        .EnableSensitiveDataLogging(efConfig.enableSensitiveDataLogging)
        //        .EnableDetailedErrors(efConfig.enableDetailedErrors)
        //        .AddInterceptors(auditInterceptor);
        //});
        return services;
    }
    public static IHost migrateDb(this IHost host)
    {
        var serviceScopeFactory = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));
        using var scope = serviceScopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        dbContext.Database.Migrate();

        seedData(dbContext);
        return host;
    }

    private static void seedData(DataContext db)
    {
        if (!db.roles.Any())
        {

            Role role = new() { active = true, name = "Super Admin", notes = "Can access everything. Do not use as a regular account", permissions = Permissions.all, dashboards = [], reports = [] };
            db.roles.Add(role);

            UserStatus userStatus = new() { name = "Active", notes = "" };
            db.userStatuses.Add(userStatus);
            db.userStatuses.Add(new() { name = "Inactive", notes = "" });

            Department department = new() { name = "IT", notes = "" };
            db.departments.Add(department);

            User user = new() { active = true, contactNumber = "", department = department, email = "test@local.app", firstName = "Test", role = role, staffNumber = "0000000", status = userStatus, surname = "User", type = UserType.Staff, username = "test@local.app" };
            db.users.Add(user); 

            UserFeed feed = new() { type = EventType.Information, activity = UserActivityType.AccountCreated, title = "Account Created", notes = user.email, user = user };
            db.userFeeds.Add(feed);
        }
        db.SaveChanges();
    }

    public static IHost setupServices(this IHost host)
    {
        var serviceScopeFactory = (IServiceScopeFactory)host.Services.GetRequiredService(typeof(IServiceScopeFactory));
        using var scope = serviceScopeFactory.CreateScope();
        var userService = scope.ServiceProvider.GetRequiredService<UserService>();
        try
        {
            var stoppingToken = CancellationToken.None;
            userService.init(stoppingToken)!.GetAwaiter().GetResult();
        }
        catch (Exception e)
        {
            // todo: log this
        }

        return host;
    }
}
