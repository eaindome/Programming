using App.Common;
using App.Common.Extensions;
using App.Data;
using App.Features.Audit;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;

namespace App.Features.UserManagement;



public class UserService : BackgroundService, IMonitoredService
{
    public const string serviceName = "User Service";
    private long lastId;
    private long currentId;
    // get all these from config
    private int sleepTimeMs = 1000;
    private int errorSleepTime = 2000;
    private object clients;
    private readonly IDbContextFactory<DataContext> dbFactory;
    private readonly ILogger<UserService> logger;
    private readonly ConcurrentDictionary<string, User> users = new(StringComparer.OrdinalIgnoreCase);
    private readonly List<Action> callbacks = new();


    public UserService(IDbContextFactory<DataContext> dbFactory, ILogger<UserService> logger)
    {
        this.dbFactory = dbFactory;
        this.logger = logger;
        currentId = 1;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Prelude.randomWaitMs(10000);
        while (!stoppingToken.IsCancellationRequested)
        {
            if (currentId == lastId)
            {
                await Task.Delay(sleepTimeMs, stoppingToken);
                continue;
            }
            lastId = currentId;
            try
            {
                await refreshUsers(stoppingToken);
            }
            catch (Exception e)
            {
                logger.logActionError(new { }, e, action: "Load Users");
                await Task.Delay(errorSleepTime, stoppingToken);
                lastId--; // force service to run again
            }
        }
    }

    public async Task<Exception?> init(CancellationToken stoppingToken)
    {
        try
        {
            await refreshUsers(stoppingToken);
            return default;
        }
        catch (Exception e)
        {
            logger.logActionError(new { }, e, action: "Init Users");
            return e;
        }
    }

    private async Task refreshUsers(CancellationToken stoppingToken)
    {
        try
        {
            using var db = await dbFactory.CreateDbContextAsync(stoppingToken);
            foreach (var user in await db.users
                .Include(x => x.status)
                .AsNoTracking()
                .ToArrayAsync(cancellationToken: stoppingToken))
            {
                users.AddOrUpdate(user.email, user, (username, existing) => user);
            }
            db.serviceFeeds.Add(new() { activity = ServiceEvent.InProgress, service = serviceName, title = $"Users Refreshed", type = EventType.Information, notes = $"{users.Count} user(s) loaded", createdOn = DateTime.UtcNow });
            foreach (var f in callbacks) f();
        }
        catch (Exception e)
        {
            logger.logActionError(new { }, e, action: "Load Users");
            throw;
        }
    }

    public User? getUser(string username)
    {
        if (string.IsNullOrWhiteSpace(username)) return null;
        if (users.TryGetValue(username, out var user)) return user;
        return default;
    }

    public User? getUserById(long userId) => users.Values.FirstOrDefault(x => x.id == userId);

    public void notify()
    {
        currentId++;
    }

    internal IEnumerable<User> getAllUsers() => users.Values;

    internal void onRefresh(Action fn)
    {
        callbacks.Add(fn);
    }
}