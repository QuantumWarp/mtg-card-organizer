using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.EntityConfigurations.Collections
{
    public class ContainerConfiguration : EntityConfiguration<Container>
    {
        public override void Configure(EntityTypeBuilder<Container> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
            builder.HasOne(x => x.Parent).WithMany(x => x.SubContainers).HasForeignKey(x => x.ParentId);
        }
    }
}
