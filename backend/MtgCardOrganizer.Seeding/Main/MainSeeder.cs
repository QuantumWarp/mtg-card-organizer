using Microsoft.AspNetCore.Hosting.Internal;
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
using System.Reflection;

namespace MtgCardOrganizer.Seeding.Main
{
    public class MainSeeder
    {
        private ServiceProvider _serviceProvider;
        private MtgCardOrganizerContext _dbContext;
        private List<IAbstractSeeder> _seeders = new List<IAbstractSeeder>();

        public void Run()
        {
            BuildServiceProvider();
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

            new DalInitializer(services, configuration, new HostingEnvironment()).AddServices();
            new BllInitializer(services, configuration, new HostingEnvironment()).AddServices();

            foreach (var seedType in SeedTypes())
            {
                services.AddSingleton(seedType);
            }

            _serviceProvider = services.BuildServiceProvider();

            _dbContext = ActivatorUtilities.CreateInstance<MtgCardOrganizerContext>(_serviceProvider);
        }

        private IEnumerable<Type> SeedTypes()
        {
            yield return typeof(RoleSeeder);
            yield return typeof(UserSeeder);
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
            var method = typeof(MainSeeder).GetMethod(nameof(SeedGeneric), BindingFlags.NonPublic | BindingFlags.Instance);

            foreach (var seedType in SeedTypes())
            {
                MethodInfo genericMethod = method.MakeGenericMethod(seedType, seedType.BaseType.GenericTypeArguments[0]);
                genericMethod.Invoke(this, null);
            }
        }

        private void SeedGeneric<T, TEntity>() where T : AbstractSeeder<TEntity> where TEntity : class
        {
            var seeder = _serviceProvider.GetService<T>();
            seeder.Initialize();
            Console.WriteLine(seeder.GetType().Name + " - Seeding");
            var data = seeder.SeedData;
            _dbContext.Set<TEntity>().AddRange(data);
            _dbContext.SaveChanges();

            seeder.CustomSeed().GetAwaiter().GetResult();
        }
    }
}
