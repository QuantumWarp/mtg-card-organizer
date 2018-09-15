using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Dal.Repositories;

namespace MtgCardOrganizer.Dal.Initialization
{
    public class DalInitializer
    {
        private IServiceCollection _services;
        private IConfigurationRoot _configuration;

        public DalInitializer(IServiceCollection services, IConfigurationRoot configuration)
        {
            _services = services;
            _configuration = configuration;
        }

        public void AddServices() 
        {
            this.AddRepositories(_services, _configuration);
            this.AddContexts(_services, _configuration);
        }

        private void AddRepositories(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddTransient<IAdminCardRepository, AdminCardRepository>();
            services.AddTransient<IContainerRepository, ContainerRepository>();
            services.AddTransient<ICollectionRepository, CollectionRepository>();
            services.AddTransient<IDeckRepository, DeckRepository>();
            services.AddTransient<ICardRepository, CardRepository>();
            services.AddTransient<ICardSetRepository, CardSetRepository>();
            services.AddTransient<ISetRepository, SetRepository>();

            services.AddTransient<IImportExportService, ImportExportService>();
        }

        private void AddContexts(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<MtgCardOrganizerContext>(options =>
                options.UseSqlite(configuration["ConnectionString"]));
        }
    }
}
