using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MtgCoreLib.Initialization;
using MtgCoreLib.Managers;

namespace Microsoft.Extensions.DependencyInjection
{    
    public static class DependencyInjectionExtensions
    {
        public static void AddAuth(this IServiceCollection services)
        {
            services.AddTransient<ClaimsPrincipal>(s => s.GetService<IHttpContextAccessor>().HttpContext.User);
            services.AddTransient<UserService>();
        }

        public static void AddManagers(this IServiceCollection services)
        {
            services.AddTransient<IAdminCardManager, AdminCardManager>();
            services.AddTransient<ICardManager, CardManager>();
            services.AddTransient<ISetManager, SetManager>();
            services.AddTransient<ICollectionManager, CollectionManager>();
        }

        public static void AddContexts(this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<MtgCoreLibContext>(options =>
                options.UseSqlServer(configuration["ConnectionString"]));
        }
    }
}
