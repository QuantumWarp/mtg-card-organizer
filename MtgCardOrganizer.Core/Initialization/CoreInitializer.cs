using System;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MtgCoreLib.Initialization;
using MtgCoreLib.Managers;

namespace MtgCardOrganizer.Identity.Initialization
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
            services.AddTransient<IAdminCardManager, AdminCardManager>();
            services.AddTransient<ICardManager, CardManager>();
            services.AddTransient<ISetManager, SetManager>();
            services.AddTransient<ICollectionManager, CollectionManager>();
        }

        public void AddContexts(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<MtgCoreLibContext>(options =>
                options.UseSqlite(configuration["ConnectionString"]));
        }
        
        public void AddOtherServices(IServiceCollection services, IConfigurationRoot configuration)
        {
        }
    }
}
