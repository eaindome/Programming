namespace App.Features.UserManagement;



public record UserEvent
{
    public UserEventType evt { get; set; }
}


public enum UserEventType
{
    NotificationsUpdated
}