using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.EntityConfigurations.Cards
{
    public class CardInstanceConfiguration : EntityConfiguration<CardInstance>
    {        
        public override void Configure(EntityTypeBuilder<CardInstance> builder)
        {
            base.Configure(builder);
        }
    }
}
