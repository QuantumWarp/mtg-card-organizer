using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.EntityConfigurations.Collections
{
    public class CollectionCardLinkConfiguration : EntityConfiguration<CollectionCardLink>
    {
        public override void Configure(EntityTypeBuilder<CollectionCardLink> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.Collection).WithMany(x => x.CollectionCardLinks).HasForeignKey(x => x.CollectionId).IsRequired();
            builder.HasOne(x => x.CardInstance).WithOne(x => x.CollectionCardLink).IsRequired();
        }
    }
}
