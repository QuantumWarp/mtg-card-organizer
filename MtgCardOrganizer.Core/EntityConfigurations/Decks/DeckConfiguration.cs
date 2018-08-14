using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Decks;

namespace MtgCardOrganizer.Core.EntityConfigurations.Decks
{
    public class DeckConfiguration : EntityConfiguration<Deck>
    {
        public override void Configure(EntityTypeBuilder<Deck> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
            builder.HasOne(x => x.Container).WithMany(x => x.Decks).HasForeignKey(x => x.ContainerId);
        }
    }
}
