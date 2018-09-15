using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Decks;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Decks
{
    public class DeckCardConfiguration : EntityConfiguration<DeckCard>
    {
        public override void Configure(EntityTypeBuilder<DeckCard> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.Deck)
                .WithMany(x => x.DeckCards)
                .HasForeignKey(x => x.DeckId);

            builder.HasOne(x => x.Card)
                .WithMany(x => x.DeckCards)
                .HasForeignKey(x => x.CardId);
        }
    }
}
