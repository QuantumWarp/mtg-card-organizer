using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities.Other
{
    public class Set : Entity
    {
        [Required]
        public string Name { get; private set; }        
        public string Abbreviation { get; private set; }
    }
}
