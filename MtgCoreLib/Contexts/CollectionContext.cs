using Microsoft.EntityFrameworkCore;

namespace MtgCoreLib.Contexts
{
    public class CollectionContext : DbContext
    {
        public CollectionContext(DbContextOptions<CollectionContext> options) : base(options)
        {
        }
    }
}