using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Bll.Initialization;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Utilities;
using MtgCardOrganizer.Seeding.Seeders;
using MtgCardOrganizer.Seeding.Utilities;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace MtgCardOrganizer.Seeding.Main
{
    public class MainSeeder
    {
        private ServiceProvider _serviceProvider;
        private MtgCardOrganizerContext _dbContext;
        private List<AbstractSeeder> _seeders = new List<AbstractSeeder>();

        public void Run()
        {
            BuildServiceProvider();
            CreateSeeders();
            Wipe();
            Migrate();
            Seed();
        }

        private void BuildServiceProvider()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            var configuration = builder.Build();

            var services = new ServiceCollection();
            
            services.AddScoped<IUserService, DummyUserService>();

            new DalInitializer(services, configuration).AddServices();
            new BllInitializer(services, configuration).AddServices();
            _serviceProvider = services.BuildServiceProvider();
            
            _dbContext = ActivatorUtilities.CreateInstance<MtgCardOrganizerContext>(_serviceProvider);
        }

        private void CreateSeeders()
        {
            _seeders.AddRange(new List<AbstractSeeder> {
                ActivatorUtilities.CreateInstance<RoleSeeder>(_serviceProvider),
                ActivatorUtilities.CreateInstance<UserSeeder>(_serviceProvider),
            });
        }

        private void Wipe()
        {
            Console.WriteLine("Wiping...");
            _dbContext.Database.EnsureDeleted();
        }

        private void Migrate()
        {
            Console.WriteLine("Migrating...");
            _dbContext.Database.Migrate();
        }

        private void Seed()
        {
            foreach (var seeder in _seeders)
            {
                Console.WriteLine(seeder.GetType().Name + " - Seeding");   
                seeder.SeedAsync().GetAwaiter().GetResult();
            }
        }
    }
}
