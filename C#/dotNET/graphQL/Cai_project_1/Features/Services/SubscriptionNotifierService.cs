using App.Features.UserManagement;
using HotChocolate.Subscriptions;

namespace App.Features.Services;


public class SubscriptionNotifierService
{
    private readonly ITopicEventSender sender;

    public SubscriptionNotifierService(ITopicEventSender sender)
    {
        this.sender = sender;
    }

    public ValueTask onUserEvent(long userId, UserEventType evt)
    {
        return sender.SendAsync($"user_{userId}", new UserEvent { evt = evt });
    }
}