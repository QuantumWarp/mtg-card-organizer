using Microsoft.EntityFrameworkCore;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Other;

namespace MtgCoreLib.Contexts
{
    public class CardsContext : DbContext
    {
        public CardsContext(DbContextOptions<CardsContext> options) : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<CardSetInfo> CardSetInfos { get; set; }
        
        public DbSet<CardType> CardTypes { get; set; }
        public DbSet<CardTypeLink> CardTypeLinks { get; set; }
        public DbSet<CardSubType> CardSubTypes { get; set; }
        public DbSet<CardSubTypeLink> CardSubTypeLinks { get; set; }

        public DbSet<Format> Formats { get; set; }
        public DbSet<Set> Sets { get; set; }
    }
}
