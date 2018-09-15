using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Repositories;
using MtgCardOrganizer.Dal.Utilities;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("MtgCardOrganizer.Seeding")]
[assembly: InternalsVisibleTo("MtgCardOrganizer.Tests")]
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
            AddRepositories(_services, _configuration);
            AddContext(_services, _configuration);
        }

        private void AddRepositories(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddScoped<IPermissionRepository, PermissionRepository>();
            services.AddScoped<IContainerRepository, ContainerRepository>();
            services.AddScoped<ICollectionRepository, CollectionRepository>();
            services.AddScoped<IDeckRepository, DeckRepository>();
            services.AddScoped<ICardRepository, CardRepository>();
            services.AddScoped<ICardSetRepository, CardSetRepository>();
            services.AddScoped<ISetRepository, SetRepository>();
        }

        private void AddContext(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<MtgCardOrganizerContext>(options =>
                options.UseSqlite(configuration["ConnectionString"]));
            
            _services.AddIdentity<User, IdentityRole>(options => {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 5;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<MtgCardOrganizerContext>()
                .AddDefaultTokenProviders();
        }
    }
}
