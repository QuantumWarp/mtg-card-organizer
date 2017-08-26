using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MtgCoreLib
{
    public class CardsContext : DbContext
    {
        public CardsContext(DbContextOptions<CardsContext> options)
            : base(options)
        { }

        public DbSet<Card> Cards { get; set; }
        public DbSet<CardBase> CardBases { get; set; }
        
        public DbSet<CardType> CardTypes { get; set; }
        public DbSet<CardSubType> CardSubTypes { get; set; }

        public DbSet<Set> Sets { get; set; }
        public DbSet<Format> Formats { get; set; }
    }
}
