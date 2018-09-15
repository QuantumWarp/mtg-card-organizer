using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Other;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Other
{
    public class FormatConfiguration : EntityConfiguration<Format>
    {
        public override void Configure(EntityTypeBuilder<Format> builder)
        {
            builder.Property(x => x.Name).IsRequired();
        }
    }
}
