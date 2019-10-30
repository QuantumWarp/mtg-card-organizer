using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Identity;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Identity
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasMany(x => x.ContainerUserPermissions)
                .WithOne(x => x.User);

            builder.Property(x => x.BaseContainerId).IsRequired();
        }
    }
}
