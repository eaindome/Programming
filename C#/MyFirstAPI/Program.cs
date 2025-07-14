using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<LanguageService>();   // register the service
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// register ef core with sqlite
builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseSqlite("Data Source=languages.db"));

builder.Services.AddScoped<LanguageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
