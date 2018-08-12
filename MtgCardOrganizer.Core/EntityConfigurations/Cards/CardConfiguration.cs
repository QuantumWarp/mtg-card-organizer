using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.EntityConfigurations.Cards
{
    public class CardConfiguration : EntityConfiguration<Card>
    {
        public override void Configure(EntityTypeBuilder<Card> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
            builder.HasMany(x => x.CardSets).WithOne(x => x.Card);
        }
    }
}
