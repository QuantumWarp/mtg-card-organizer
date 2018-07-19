using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MtgCoreLib.Initialization
{
    public class MtgCoreLibContextFactory : IDesignTimeDbContextFactory<MtgCoreLibContext>
    {
        public MtgCoreLibContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MtgCoreLibContext>();
            builder.UseSqlite(Configuration.ConnectionStrings.Default);
            return new MtgCoreLibContext(builder.Options);
        }
    }
}
