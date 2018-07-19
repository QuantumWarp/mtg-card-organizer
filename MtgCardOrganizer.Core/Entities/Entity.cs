using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities
{
    public abstract class Entity
    {
        [Required, Key]
        public int Id { get; protected set; }
    }
}
