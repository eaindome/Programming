namespace App.Data.Contracts;



public interface IAuditable : IHasId
{
    string createdBy { get; set; }
    DateTime createdOn { get; set; }
    string updatedBy { get; set; }
    DateTime? updatedOn { get; set; }
    int revision { get; set; }
}



public interface IAuditableWithStringId : IHasStringId
{
    string createdBy { get; set; }
    DateTime createdOn { get; set; }
    string updatedBy { get; set; }
    DateTime? updatedOn { get; set; }
    int revision { get; set; }
}