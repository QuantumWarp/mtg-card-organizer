using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MtgCardOrganizer.Dal.Initialization
{
    public class MtgCoreLibContextFactory : IDesignTimeDbContextFactory<MtgCardOrganizerContext>
    {
        public MtgCardOrganizerContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MtgCardOrganizerContext>();
            builder.UseSqlite(Configuration.ConnectionStrings.Default);
            return new MtgCardOrganizerContext(builder.Options);
        }
    }
}
