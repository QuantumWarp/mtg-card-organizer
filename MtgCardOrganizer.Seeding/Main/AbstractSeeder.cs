using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Seeding.Main
{
    public abstract class AbstractSeeder
    {
        public abstract Task SeedAsync();
    }
}
