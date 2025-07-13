using App.Data.Contracts;
using App.Data;

namespace App.Features.Audit;

public static class AuditExtensions
{
    public static void auditEntity<T>(this DataContext db, T entity, UserActivityType activityType, long userId, string title, string notes = "") where T : IHasId
    {
        db.userFeeds.Add(new UserFeed { activity = activityType, title = title, notes = notes, type = EventType.Information, userId = userId, entityId = entity.id, entityType = entity.GetType().Name });
    }
    public static void auditCreate<T>(this DataContext db, T entity, string entityTitle, long userId, string notes = "") where T : IHasId, INamedEntity => db.auditEntity(entity, UserActivityType.Create, userId, $"Created {T.EntityName}#{entity.id}: {entityTitle}", notes);
    public static void auditUpdate<T>(this DataContext db, T entity, string entityTitle, long userId, string notes = "") where T : IHasId, INamedEntity => db.auditEntity(entity, UserActivityType.Create, userId, $"Updated {T.EntityName}#{entity.id}: {entityTitle}", notes);
    public static void auditDelete<T>(this DataContext db, T entity, string entityTitle, long userId, string notes = "") where T : IHasId, INamedEntity => db.auditEntity(entity, UserActivityType.Create, userId, $"Deleted {T.EntityName}#{entity.id}: {entityTitle}", notes);
}
