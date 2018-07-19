using System.Threading.Tasks;
using MtgCardOrganizer.Seeding.Main;
using Microsoft.Extensions.DependencyInjection;
using MtgCoreLib.Initialization;

namespace MtgCardOrganizer.Seeding.FeatureSeeding.Core
{
    public class CoreSeeder : SectionSeeder<MtgCoreLibContext>
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
