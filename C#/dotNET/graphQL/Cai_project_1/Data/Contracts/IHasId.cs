namespace App.Data.Contracts;

public interface IHasId
{
    long id { get; set; }
}

public interface IHasStringId
{
    string id { get; set; }
}
