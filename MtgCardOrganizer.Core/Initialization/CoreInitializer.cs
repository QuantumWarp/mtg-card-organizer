using System;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Repositories;

namespace MtgCardOrganizer.Core.Initialization
{
    public class CoreInitializer
    {
        private IServiceCollection _services;
        private IConfigurationRoot _configuration;

        public CoreInitializer(IServiceCollection services, IConfigurationRoot configuration)
        {
            _services = services;
            _configuration = configuration;
        }

        public void AddServices() 
        {
            this.AddRepositories(_services, _configuration);
            this.AddContexts(_services, _configuration);
            this.AddOtherServices(_services, _configuration);
        }

        public void AddRepositories(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddTransient<IAdminCardRepository, AdminCardRepository>();
            services.AddTransient<ICardRepository, CardRepository>();
            services.AddTransient<ISetRepository, SetRepository>();
            services.AddTransient<ICollectionRepository, CollectionRepository>();
        }

        public void AddContexts(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<MtgCardOrganizerContext>(options =>
                options.UseSqlite(configuration["ConnectionString"]));
        }
        
        public void AddOtherServices(IServiceCollection services, IConfigurationRoot configuration)
        {
        }
    }
}
