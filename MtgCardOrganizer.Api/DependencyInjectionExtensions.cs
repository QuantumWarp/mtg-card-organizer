using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MtgCoreLib.Contexts;
using MtgCoreLib.Managers;

namespace Microsoft.Extensions.DependencyInjection
{    
    public static class DependencyInjectionExtensions
    {
        public static void AddManagers(this IServiceCollection services)
        {
            services.AddTransient<IAdminCardManager, AdminCardManager>();
            services.AddTransient<ICardManager, CardManager>();
            services.AddTransient<ISetManager, SetManager>();
            services.AddTransient<ICollectionManager, CollectionManager>();
        }

        public static void AddContexts(this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<CardContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("Default")));
            services.AddDbContext<CollectionContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("Default")));
        }
    }
}
