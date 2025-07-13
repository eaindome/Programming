namespace App.Common.Extensions;



public static class ExceptionExtensions
{
    public static string sanitize(this Exception e, string? defaultError = null)
    {
        if (e is Refit.ApiException refitError)
        {
            if (refitError.Content != null) return refitError.Content;
        }
        if (e is HttpException httpError)
        {
            return $"Request:\n{httpError.requestBody ?? ""}\n\nResponse:\n{httpError.responseBody}";
        }
        // todo:
        return e.GetBaseException().Message;
    }

    public static GeneralException toGeneralException(this Exception e)
    {
        return new GeneralException(e.sanitize());
    }
}
