using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Identity.Initialization;
using MtgCardOrganizer.Seeding.Seeders;

namespace MtgCardOrganizer.Seeding.Main
{
    public class MainSeeder
    {
        private ServiceProvider _serviceProvider;
        private List<ISectionSeeder> _sectionSeeders = new List<ISectionSeeder>();

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
            new IdentityInitializer(services, configuration).AddServices();
            new CoreInitializer(services, configuration).AddServices();
            _serviceProvider = services.BuildServiceProvider();
        }

        private void CreateSeeders()
        {
            _sectionSeeders.AddRange(new List<ISectionSeeder> {
                new IdentitySeeder(_serviceProvider),
                new CoreSeeder(_serviceProvider),
            });
        }

        private void Wipe()
        {
            var processedDbNames = new List<string>();

            foreach (var seeder in _sectionSeeders)
            {
                Console.WriteLine(seeder.GetType().Name + " - Wipe");   
                processedDbNames = seeder.Wipe(processedDbNames);
            }
        }

        private void Migrate()
        {
            foreach (var seeder in _sectionSeeders)
            {
                Console.WriteLine(seeder.GetType().Name + " - Migrate");   
                seeder.Migrate();
            }
        }

        private void Seed()
        {

            foreach (var seeder in _sectionSeeders)
            {
                Console.WriteLine(seeder.GetType().Name + " - Seeding");   
                seeder.SeedAsync().GetAwaiter().GetResult();
            }
        }
    }
}
