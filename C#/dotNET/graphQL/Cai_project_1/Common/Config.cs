namespace App.Common;



public class CorsConfig
{
    public static string ConfigName = "cors";

    public string[] permittedOrigins { get; set; } = null!;
}