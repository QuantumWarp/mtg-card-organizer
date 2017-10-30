using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities.Cards
{
    public class CardSubType : Entity
    {
        [Required]
        public string Name { get; private set; }
    }
}
