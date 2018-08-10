using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.EntityConfigurations.Cards
{
    public class SetConfiguration : EntityConfiguration<Set>
    {        
        public override void Configure(EntityTypeBuilder<Set> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Code).IsRequired();
        }
    }
}
