using System.Threading.Tasks;
using MtgCardOrganizer.Seeding.Main;
using Microsoft.Extensions.DependencyInjection;
using MtgCardOrganizer.Core.Initialization;

namespace MtgCardOrganizer.Seeding.Seeders
{
    public class CoreSeeder : SectionSeeder<MtgCardOrganizerContext>
    {
        public CoreSeeder(ServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public override Task SeedAsync()
        {
            return Task.CompletedTask;
        }
    }
}
