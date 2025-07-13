using Cottle;

namespace App.Features.Templates;

public static class TemplateValueFunctions
{
    public static Value money => Value.FromFunction(Function.CreatePure1((state, value) =>
    {
        try
        {
            return value.AsNumber.ToString("0.00");
        }
        catch (Exception e)
        {
            // todo: log this
            return "";
        }
    }));
}
