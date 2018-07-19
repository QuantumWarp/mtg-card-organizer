using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MtgCardOrganizer.Seeding.Main
{
    public interface ISectionSeeder
    {        
        List<string> Wipe(List<string> processedDbNames);
        void Migrate();
        Task SeedAsync();
    }

    public abstract class SectionSeeder<T> : ISectionSeeder where T : DbContext
    {
        private T _dbContext;
        private ServiceProvider _serviceProvider;

        public SectionSeeder(ServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _dbContext = ActivatorUtilities.CreateInstance<T>(_serviceProvider);
        }

        public List<string> Wipe(List<string> processedDbNames)
        {
            var dbName = _dbContext.Database.GetDbConnection().Database;

            if (!processedDbNames.Contains(dbName))
            {
                _dbContext.Database.EnsureDeleted();
                processedDbNames.Add(dbName);
            }

            return processedDbNames;
        }

        public void Migrate()
        {            
            _dbContext.Database.Migrate();
        }

        public abstract Task SeedAsync();
        
        protected async Task ActivateAndSeed<TAbstractSeeder>() where TAbstractSeeder : AbstractSeeder
        {
            var seeder = ActivatorUtilities.CreateInstance<TAbstractSeeder>(_serviceProvider);
            await seeder.SeedAsync();
        }
    }
}
