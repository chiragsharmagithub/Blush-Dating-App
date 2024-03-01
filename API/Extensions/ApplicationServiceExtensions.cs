using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();

            // Configure the DbContext to use SQLite
            services.AddDbContext<DataContext>(options => 
            {
                // We can acces database using this conenction string
                options.UseSqlite(config.GetConnectionString("DefaultConnection")); 
            });

            return services;
        }
    }
}