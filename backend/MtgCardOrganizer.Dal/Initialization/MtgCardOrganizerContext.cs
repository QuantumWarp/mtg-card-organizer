using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Entities.Decks;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Entities.Other;
using MtgCardOrganizer.Dal.EntityConfigurations.Cards;
using MtgCardOrganizer.Dal.EntityConfigurations.Collections;
using MtgCardOrganizer.Dal.EntityConfigurations.Containers;
using MtgCardOrganizer.Dal.EntityConfigurations.Decks;
using MtgCardOrganizer.Dal.EntityConfigurations.Identity;
using MtgCardOrganizer.Dal.EntityConfigurations.Other;

namespace MtgCardOrganizer.Dal.Initialization
{
    public class MtgCardOrganizerContext : IdentityDbContext<User>
    {
        public DbSet<Container> Containers { get; set; }
        public DbSet<ContainerUserPermission> ContainerUserPermissions { get; set; }
        public DbSet<ContainerUserBookmark> ContainerUserBookmarks { get; set; }

        public DbSet<Collection> Collections { get; set; }
        public DbSet<CollectionUserBookmark> CollectionUserBookmarks { get; set; }
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
            modelBuilder.ApplyConfiguration(new UserConfiguration());

            modelBuilder.ApplyConfiguration(new ContainerConfiguration());
            modelBuilder.ApplyConfiguration(new ContainerUserPermissionConfiguration());
            modelBuilder.ApplyConfiguration(new ContainerUserBookmarkConfiguration());

            modelBuilder.ApplyConfiguration(new CollectionConfiguration());
            modelBuilder.ApplyConfiguration(new CollectionUserBookmarkConfiguration());
            modelBuilder.ApplyConfiguration(new CardInstanceConfiguration());

            modelBuilder.ApplyConfiguration(new DeckConfiguration());
            modelBuilder.ApplyConfiguration(new DeckCardConfiguration());
            
            modelBuilder.ApplyConfiguration(new CardConfiguration());
            modelBuilder.ApplyConfiguration(new CardSetConfiguration());
            
            modelBuilder.ApplyConfiguration(new FormatConfiguration());
            modelBuilder.ApplyConfiguration(new SetConfiguration());
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
