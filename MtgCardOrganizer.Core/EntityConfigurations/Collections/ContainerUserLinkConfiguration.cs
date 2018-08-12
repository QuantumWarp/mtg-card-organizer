using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.EntityConfigurations.Collections
{
    public class ContainerUserLinkConfiguration : IEntityTypeConfiguration<ContainerUserLink>
    {
        public void Configure(EntityTypeBuilder<ContainerUserLink> builder)
        {
            builder.HasKey(x => new { x.UserId, x.ContainerId });
            builder.HasOne(x => x.Container).WithMany(x => x.ContainerUserLinks).IsRequired();
        }
    }
}
