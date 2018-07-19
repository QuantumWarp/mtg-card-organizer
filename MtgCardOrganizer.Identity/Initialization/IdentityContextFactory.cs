using MtgCardOrganizer.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MtgCardOrganizer.Identity.Initialization
{
    public class IdentityContextFactory : IDesignTimeDbContextFactory<IdentityContext>
    {
        public IdentityContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<IdentityContext>();
            builder.UseSqlite(Configuration.ConnectionStrings.Default);
            return new IdentityContext(builder.Options);
        }
    }
}

