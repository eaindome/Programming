using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace App.Features.CommandProcessor;



public class CommandTokenGenerator : ICommandTokenGenerator
{
    private readonly Config config;
    private readonly IServiceProvider serviceProvider;

    public CommandTokenGenerator(IConfiguration configuration, IServiceProvider serviceProvider)
    {
        config = configuration.GetRequiredSection(Config.configKey).Get<Config>()!;
        this.serviceProvider = serviceProvider;
    }

    public CommandToken generate(string scope, Dictionary<string, string>? otherValues = null)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var issuer = config.issuer;
        var audience = config.audience;
        var jwtValidity = DateTime.UtcNow.AddMinutes(config.tokenExpiry);

        // todo: create claims
        List<Claim> claims =
        [
            new Claim("scope", scope)
        ];
        if (otherValues != null)
        {
            foreach (var kvp in otherValues)
            {
                claims.Add(new(kvp.Key, kvp.Value));
            }
        }

        var token = new JwtSecurityToken(issuer,
          audience,
          claims: claims,
          expires: jwtValidity,
          signingCredentials: creds);

        return new(new JwtSecurityTokenHandler().WriteToken(token), jwtValidity);
    }

    public string fromCommand<T>(T args, long userId) where T : IExternalCommand
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var issuer = config.issuer;
        var audience = config.audience;
        var jwtValidity = DateTime.UtcNow.AddMinutes(Convert.ToDouble(config.tokenExpiry));

        // create claims
        List<Claim> claims =
        [
            new Claim("scope", "action"),
            new Claim("type", args.name),
            new Claim("args", args.serialize()),
            new Claim("userId", userId.ToString()),
            new Claim("timeout", jwtValidity.ToString("yyyy-MM-dd HH:mm:ss")),
            new Claim("v", config.version.ToString())
        ];

        var token = new JwtSecurityToken(issuer,
          audience,
          claims: claims,
          expires: jwtValidity,
          signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public (CommandConfig<object>? cmd, string? error) toCommand(string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadJwtToken(token);

        var validationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };

        try
        {
            var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            var claims = principal.Claims.ToDictionary(x => x.Type, x => x.Value);
            if (claims["scope"] != "action") return (default, "Invalid token provided");
            if (claims["v"] != config.version.ToString()) return (default, "Invalid version");
            var type = claims["type"];
            var args = claims["args"];
            var userId = claims["userId"];

            var decoder = serviceProvider.GetKeyedService<ICommandSerializer>(type);
            if (decoder == null) return (default, "No valid serializer was found");
            // todo: check expiry - validatedToken.ValidTo
            var cmd = new CommandConfig<object>
            {
                type = type,
                userId = long.Parse(userId),
                args = decoder.deserialize(claims["args"])
            };
            return (cmd, default);
        }
        catch (Exception e)
        {
            // todo: log this
            return (default, e.GetBaseException().Message);
        }
    }

    public record Config
    {
        public static string configKey => "signing";
        public string secretKey { get; set; }
        public string issuer { get; set; }
        public string audience { get; set; }
        public int tokenExpiry { get; set; }
        public int version { get; set; }
    }
}