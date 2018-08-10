using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Other;

namespace MtgCardOrganizer.Core.EntityConfigurations.Other
{
    public class FormatConfiguration : EntityConfiguration<Format>
    {
        public override void Configure(EntityTypeBuilder<Format> builder)
        {
            builder.Property(x => x.Name).IsRequired();
        }
    }
}
