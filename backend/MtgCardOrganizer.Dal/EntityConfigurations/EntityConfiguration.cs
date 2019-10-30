using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MtgCardOrganizer.Dal.EntityConfigurations
{
    public abstract class EntityConfiguration<T> : IEntityTypeConfiguration<T> where T : class 
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey("Id");
        }
    }
}
