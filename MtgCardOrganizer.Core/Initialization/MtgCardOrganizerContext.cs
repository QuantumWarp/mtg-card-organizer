using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Entities.Containers;
using MtgCardOrganizer.Core.Entities.Decks;
using MtgCardOrganizer.Core.Entities.Other;
using MtgCardOrganizer.Core.EntityConfigurations.Cards;
using MtgCardOrganizer.Core.EntityConfigurations.Collections;
using MtgCardOrganizer.Core.EntityConfigurations.Containers;
using MtgCardOrganizer.Core.EntityConfigurations.Decks;
using MtgCardOrganizer.Core.EntityConfigurations.Other;

namespace MtgCardOrganizer.Core.Initialization
{
    public class MtgCardOrganizerContext : DbContext
    {
        public DbSet<Container> Containers { get; set; }
        public DbSet<ContainerUserLink> ContainerUserLinks { get; set; }

        public DbSet<Collection> Collections { get; set; }
        public DbSet<CardInstance> CardInstances { get; set; }

        public DbSet<Deck> Decks { get; set; }
        public DbSet<DeckCard> DeckCards { get; set; }

        public DbSet<Card> Cards { get; set; }
        public DbSet<CardSet> CardSets { get; set; }

        public DbSet<Format> Formats { get; set; }
        public DbSet<Set> Sets { get; set; }

        public MtgCardOrganizerContext(DbContextOptions<MtgCardOrganizerContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ContainerConfiguration());
            modelBuilder.ApplyConfiguration(new ContainerUserLinkConfiguration());

            modelBuilder.ApplyConfiguration(new CollectionConfiguration());
            modelBuilder.ApplyConfiguration(new CardInstanceConfiguration());

            modelBuilder.ApplyConfiguration(new DeckConfiguration());
            modelBuilder.ApplyConfiguration(new DeckCardConfiguration());
            
            modelBuilder.ApplyConfiguration(new CardConfiguration());
            modelBuilder.ApplyConfiguration(new CardSetConfiguration());
            
            modelBuilder.ApplyConfiguration(new FormatConfiguration());
            modelBuilder.ApplyConfiguration(new SetConfiguration());
        }
    }
}
