using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities.Other
{
    public class Format : Entity
    {
        [Required]
        public string Name { get; private set; }
    }
}
