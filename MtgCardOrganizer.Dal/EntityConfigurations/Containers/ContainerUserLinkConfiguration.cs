using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Containers
{
    public class ContainerUserLinkConfiguration : IEntityTypeConfiguration<ContainerUserLink>
    {
        public void Configure(EntityTypeBuilder<ContainerUserLink> builder)
        {
            builder.HasKey(x => new { x.UserId, x.ContainerId });

            builder.HasOne(x => x.Container)
                .WithMany(x => x.ContainerUserLinks)
                .HasForeignKey(x => x.ContainerId)
                .IsRequired();

            builder.HasOne(x => x.User)
                .WithMany(x => x.ContainerUserLinks)
                .HasForeignKey(x => x.UserId)
                .IsRequired();
        }
    }
}
