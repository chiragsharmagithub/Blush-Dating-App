using API.Data;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

// Create a new WebApplication builder
var builder = WebApplication.CreateBuilder(args);

// Retrieve the configurations from the builder
var _config = builder.Configuration;

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the DbContext to use SQLite
builder.Services.AddDbContext<DataContext>(options => 
{
    // We can acces database using this conenction string
    options.UseSqlite(_config.GetConnectionString("DefaultConnection")); 
});

// Build the web application
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Define an array of weather summaries
var summaries = new[]
{
    "Freezing", "Chilly", "Cool", "Mild", "Warm", "Hot"
};

// Map the "/weatherforecast" endpoint to a function that generates a weather forecast
app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

// Map the "/testapi" endpoint to a function that returns a testApiRecord object
app.MapGet("/testapi", () =>
{
    var testObj = new testApiRecord(
        "CHRG",
        20
    );
    return testObj;
})
.WithName("TestApi")
.WithOpenApi();

// Map the controllers to the application
app.MapControllers();

// Run the application
app.Run();

// Define a record for a weather forcast
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

// Define a record for a test API response
record testApiRecord(string name, int age) { }