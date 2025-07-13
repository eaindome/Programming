namespace App.Common;


public interface ISensitive<T>
{
    T desensitize();
}