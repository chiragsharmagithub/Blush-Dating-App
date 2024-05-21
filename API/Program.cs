using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SQLitePCL;

internal class Program
{
    private static async Task Main(string[] args)
    {
        // Create a new WebApplication builder
        var builder = WebApplication.CreateBuilder(args);

        // Retrieve the configurations from the builder
        var _config = builder.Configuration;

        // Add services to the container.
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

        // Configure Services (below)

        builder.Services.AddApplicationServices(_config);
        builder.Services.AddControllers();
        builder.Services.AddCors();
        builder.Services.AddIdentityServices(_config);

        // Configure (below)

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();


        // Build the web application
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        // if (app.Environment.IsDevelopment())
        // {
        //     app.UseSwagger();
        //     app.UseSwaggerUI();
        // }

        app.UseMiddleware<ExceptionMiddleware>();

        app.UseHttpsRedirection();

        app.UseRouting();

        // CORS is a security feature that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources. It is needed when a website wants to request resources from another domain, which is known as Cross-Origin HTTP request.
        // So the above code is allowing the website running on http://localhost:4200 to access the resources of the application.

        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
            .WithOrigins("http://localhost:4200"));

        app.UseAuthentication();
        app.UseAuthorization();

        // Map the controllers to the application
        app.MapControllers();

        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        try 
        {
            var context = services.GetRequiredService<DataContext>();
            await context.Database.MigrateAsync();
            await Seed.SeedUsers(context);
        }
        catch (Exception ex) 
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }

        // Run the application
        await app.RunAsync();


        // -----------------------------------------------------------------------------------------


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
    }
}

// Define a record for a weather forcast
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

// Define a record for a test API response
record testApiRecord(string name, int age) { }