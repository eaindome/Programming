using App.Common.Extensions;
using App.Common;
using App.Features.UserManagement;

namespace App.Features.Services;

public class ServiceHandler
{
    public static CallResult Handle(RestartService input, [Service] IServiceProvider serviceProvider)
    {
        try
        {
            IMonitoredService? service = null;
            switch (input.serviceName)
            {
                case UserService.serviceName:
                    service = serviceProvider.GetRequiredService<UserService>();
                    break;
                default:
                    break;
            }
            if (service == null) return CallResult.error($"Service {input.serviceName} not found");
            service!.notify();
            return CallResult.ok("Service notified to restart successfully");
        }
        catch (Exception e)
        {
            return CallResult.error(e.sanitize());
        }
    }
}
