using System.ComponentModel.DataAnnotations;

namespace MtgCardOrganizer.Core.Entities
{
    public abstract class Entity
    {
        public int Id { get; set; }
    }
}
