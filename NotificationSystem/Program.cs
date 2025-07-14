using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using NotificationSystem.Data;
using NotificationSystem.Hubs;
using NotificationSystem.Middleware;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowAll", policyBuilder => 
    {
        policyBuilder.WithOrigins("http://127.0.0.1:5500")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SignalR
builder.Services.AddSignalR(options => 
{
    options.EnableDetailedErrors = true;
    options.MaximumReceiveMessageSize = 102400; // 100 KB
});

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add custom error handling middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseStaticFiles();

// For testing without authentication, we can skip these
// app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Map the SignalR hub
app.MapHub<NotificationHub>("/notificationHub");

app.Run();