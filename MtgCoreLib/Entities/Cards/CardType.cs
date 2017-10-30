using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities.Cards
{
    public class CardType : Entity
    {
        [Required]
        public string Name { get; private set; }
    }
}
