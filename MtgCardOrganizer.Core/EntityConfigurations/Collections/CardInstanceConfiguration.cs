using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.EntityConfigurations.Collections
{
    public class CardInstanceConfiguration : EntityConfiguration<CardInstance>
    {        
        public override void Configure(EntityTypeBuilder<CardInstance> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.CardSet).WithMany(x => x.CardInstances).HasForeignKey(x => x.CardSetId).IsRequired();
            builder.HasOne(x => x.Collection).WithMany(x => x.CardInstances).HasForeignKey(x => x.CollectionId).IsRequired();;
        }
    }
}
