using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Containers
{
    public class ContainerUserPermissionConfiguration : IEntityTypeConfiguration<ContainerUserPermission>
    {
        public void Configure(EntityTypeBuilder<ContainerUserPermission> builder)
        {
            builder.HasKey(x => new { x.UserId, x.ContainerId });

            builder.HasOne(x => x.Container)
                .WithMany(x => x.ContainerUserPermissions)
                .HasForeignKey(x => x.ContainerId)
                .IsRequired();

            builder.HasOne(x => x.User)
                .WithMany(x => x.ContainerUserPermissions)
                .HasForeignKey(x => x.UserId)
                .IsRequired();
        }
    }
}
