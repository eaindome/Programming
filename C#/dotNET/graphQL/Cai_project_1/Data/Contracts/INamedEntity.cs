namespace App.Data.Contracts;

public interface INamedEntity
{
    static abstract string EntityName { get; }
}
