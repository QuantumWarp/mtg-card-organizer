using System.ComponentModel.DataAnnotations;

namespace MtgCardOrganizer.Dal.Entities
{
    public abstract class Entity
    {
        public int Id { get; set; }
    }
}
