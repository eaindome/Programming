using App.Common.Extensions;
using App.Common;
using App.Data;
using Microsoft.EntityFrameworkCore;
using App.Features.Services;

namespace App.Features.Reports;

public class QueuedReportProcessorService : BackgroundService, IMonitoredService
{
    public const string serviceName = "Queued Report Processor";
    private long lastId;
    private long currentId;
    // get all these from config
    private readonly int sleepTimeMs = 10000;
    private readonly int errorSleepTime = 20000;
    private readonly int batchSize = 1000;
    private readonly int okSleepTimeMs = 60000;
    private readonly int concurrency = 3;
    private readonly IDbContextFactory<DataContext> dbFactory;
    private readonly ILogger<QueuedReportProcessorService> logger;
    private readonly SubscriptionNotifierService subscriptions;

    public QueuedReportProcessorService(IDbContextFactory<DataContext> dbFactory, ILogger<QueuedReportProcessorService> logger, SubscriptionNotifierService subscriptions)
    {
        this.dbFactory = dbFactory;
        this.logger = logger;
        this.subscriptions = subscriptions;
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
                using var db = await dbFactory.CreateDbContextAsync(stoppingToken);
                var pending = await db.queuedReports
                    .Where(x => x.active)
                    .Take(batchSize)
                    .ToArrayAsync(stoppingToken);
                if (!pending.Any())
                {
                    continue;
                }

                // todo: parallelize this
                SemaphoreSlim semaphore = new(concurrency);
                // todo: complete this
                foreach (var entry in pending)
                {
                    // todo: pull the data
                    // if new or pending, send email
                    // if send, send email
                    // if email sent, mark as processed
                }
                await db.SaveChangesAsync(stoppingToken);
                lastId--; // force system to run again
                await Task.Delay(okSleepTimeMs, stoppingToken);
            }
            catch (Exception e)
            {
                logger.logActionError(new { }, e, action: "Queued Report Service");
                await Task.Delay(errorSleepTime, stoppingToken);
                lastId--; // force service to run again
            }
        }
    }


    public void notify()
    {
        logger.logActionInfo(new { currentId }, "Received", message: "Notification received", action: nameof(notify));
        currentId++;
    }
}