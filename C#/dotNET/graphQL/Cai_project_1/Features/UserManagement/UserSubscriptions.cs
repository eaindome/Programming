using App.Features.Observability;
using Cai;
using HotChocolate.Subscriptions;
using System.Runtime.CompilerServices;

namespace App.Features.UserManagement;


[Subscriptions]
public partial class UserSubscriptions
{
    private async IAsyncEnumerable<UserEvent> onUserEventHandler(long userId, [Service] AuthContext authContext, [Service] ITopicEventReceiver eventReceiver, [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        try
        {
            userId = authContext.userId > 0 ? authContext.userId : userId;
            var topicName = $"user_{userId}";
            var sourceStream = await eventReceiver.SubscribeAsync<UserEvent>(topicName, cancellationToken);
            cancellationToken.Register(() =>
            {
                sourceStream.DisposeAsync();
            });
            await foreach (UserEvent evt in sourceStream.ReadEventsAsync())
            {
                yield return evt;
            }
            yield break;
        }
        finally
        {
            // todo:
        }
    }

    [Subscribe(With = nameof(onUserEventHandler))]
    public UserEvent onUserEvent(long userId, [Service] AuthContext authContext, [EventMessage] UserEvent evt)
    {
        return evt;
    }
}