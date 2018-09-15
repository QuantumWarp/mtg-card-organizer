using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Cards
{
    public class CardConfiguration : EntityConfiguration<Card>
    {
        public override void Configure(EntityTypeBuilder<Card> builder)
        {
            base.Configure(builder);

            builder.HasIndex(x => x.Name);

            builder.Property(x => x.Name).IsRequired();
            builder.HasMany(x => x.CardSets).WithOne(x => x.Card);
        }
    }
}
