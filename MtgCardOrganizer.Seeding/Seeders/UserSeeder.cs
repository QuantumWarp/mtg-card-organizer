using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Seeding.Main;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Seeding.Seeders
{
    public class UserSeeder : AbstractSeeder
    {
        private IIdentityService _identityService;
        
        public UserSeeder(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async override Task SeedAsync()
        {
            //await _identityService.RegisterAsync(new RegisterRequest
            //{
            //    Username = "QuantumWarp",
            //    Email = "quantum@quantum.com",
            //    Password = "admin123",
            //});

            //await _identityService.RegisterAsync(new RegisterRequest
            //{
            //    Username = "TestUser",
            //    Email = "test@test.com",
            //    Password = "admin123",
            //});
        }
    }
}
