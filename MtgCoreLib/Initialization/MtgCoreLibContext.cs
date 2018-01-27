using Microsoft.EntityFrameworkCore;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Collections;
using MtgCoreLib.Entities.Other;

namespace MtgCoreLib.Initialization
{
    public class MtgCoreLibContext : DbContext
    {
        public MtgCoreLibContext(DbContextOptions<MtgCoreLibContext> options) : base(options)
        {
        }

        public DbSet<Collection> Collections { get; set; }
        public DbSet<CollectionCardLink> CollectionCardLinks { get; set;}

        public DbSet<Card> Cards { get; set; }
        public DbSet<CardSetInfo> CardSetInfos { get; set; }
        public DbSet<Format> Formats { get; set; }
        public DbSet<Set> Sets { get; set; }
    }
}
