using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Collections;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Containers
{
    public class CollectionUserFavoriteConfiguration : IEntityTypeConfiguration<CollectionUserFavorite>
    {
        public void Configure(EntityTypeBuilder<CollectionUserFavorite> builder)
        {
            builder.HasKey(x => new { x.UserId, x.CollectionId });

            builder.HasOne(x => x.Collection)
                .WithMany(x => x.CollectionUserFavorites)
                .HasForeignKey(x => x.CollectionId)
                .IsRequired();

            builder.HasOne(x => x.User)
                .WithMany(x => x.CollectionUserFavorites)
                .HasForeignKey(x => x.UserId)
                .IsRequired();
        }
    }
}
