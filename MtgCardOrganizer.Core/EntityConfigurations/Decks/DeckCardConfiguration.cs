using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Decks;

namespace MtgCardOrganizer.Core.EntityConfigurations.Decks
{
    public class DeckCardConfiguration : EntityConfiguration<DeckCard>
    {
        public override void Configure(EntityTypeBuilder<DeckCard> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.Deck).WithMany(x => x.Cards);
            builder.HasOne(x => x.Card).WithMany(x => x.DeckCards);
        }
    }
}
