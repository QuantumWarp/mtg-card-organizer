using System.Threading.Tasks;
using MtgCardOrganizer.Seeding.Main;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Identity.Initialization;
using MtgCardOrganizer.Identity.Managers;
using MtgCardOrganizer.Identity.Requests;

namespace MtgCardOrganizer.Seeding.Seeders
{
    public class IdentitySeeder : SectionSeeder<IdentityContext>
    {
        private IIdentityUserRepository _systemUserRepository;
        
        public IdentitySeeder(ServiceProvider serviceProvider) : base(serviceProvider)
        {
            _systemUserRepository = ActivatorUtilities.CreateInstance<IdentityUserRepository>(serviceProvider);
        }

        public async override Task SeedAsync()
        {
            await _systemUserRepository.RegisterAsync(new RegisterCommand {
                Username = "QuantumWarp",
                Email = "test@test.com",
                Password = "admin123",
            });
        }
    }
}
