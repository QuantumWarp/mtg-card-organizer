using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.EntityConfigurations.Collections
{
    public class CollectionConfiguration : EntityConfiguration<Collection>
    {
        public override void Configure(EntityTypeBuilder<Collection> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
            builder.HasOne(x => x.Parent).WithMany(x => x.SubCollections).HasForeignKey(x => x.ParentId);
        }
    }
}
