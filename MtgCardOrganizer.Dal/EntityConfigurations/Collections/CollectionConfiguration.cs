using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Collections;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Collections
{
    public class CollectionConfiguration : EntityConfiguration<Collection>
    {
        public override void Configure(EntityTypeBuilder<Collection> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
            builder.HasOne(x => x.Container).WithMany(x => x.Collections).HasForeignKey(x => x.ContainerId);
        }
    }
}
