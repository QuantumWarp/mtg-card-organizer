using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.EntityConfigurations.Cards
{
    public class CardSetConfiguration : EntityConfiguration<CardSet>
    {        
        public override void Configure(EntityTypeBuilder<CardSet> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Artist).IsRequired();
            builder.Property(x => x.Rarity).IsRequired();

            builder.HasOne(x => x.Card).WithMany(x => x.CardSets).HasForeignKey(x => x.CardId).IsRequired();
            builder.HasOne(x => x.Set).WithMany(x => x.CardSets).HasForeignKey(x => x.SetId).IsRequired();
        }
    }
}
