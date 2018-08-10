using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.EntityConfigurations.Collections
{
    public class CollectionUserLinkConfiguration : IEntityTypeConfiguration<CollectionUserLink>
    {
        public void Configure(EntityTypeBuilder<CollectionUserLink> builder)
        {
            builder.HasKey(x => new { x.UserId, x.CollectionId });
            builder.HasOne(x => x.Collection).WithMany(x => x.CollectionUserLinks).IsRequired();
        }
    }
}
