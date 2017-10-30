using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MtgCoreLib.Contexts;

namespace MtgCoreLib.Initialization
{
    public class CardsContextFactory : IDesignTimeDbContextFactory<CardsContext>
    {
        public CardsContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<CardsContext>();
            builder.UseSqlServer(Configuration.ConnectionStrings.Default);
            return new CardsContext(builder.Options);
        }
    }
}
