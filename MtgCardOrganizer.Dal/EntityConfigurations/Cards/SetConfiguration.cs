using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Dal.EntityConfigurations.Cards
{
    public class SetConfiguration : EntityConfiguration<Set>
    {        
        public override void Configure(EntityTypeBuilder<Set> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).IsRequired();
        }
    }
}
