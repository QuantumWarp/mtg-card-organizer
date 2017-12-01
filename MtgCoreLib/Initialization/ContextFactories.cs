using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MtgCoreLib.Contexts;

namespace MtgCoreLib.Initialization
{
    public class CardsContextFactory : IDesignTimeDbContextFactory<CardContext>
    {
        public CardContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<CardContext>();
            builder.UseSqlServer(Configuration.ConnectionStrings.Default);
            return new CardContext(builder.Options);
        }
    }
}
