using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MtgCoreLib.Entities.Cards
{
    public class CardSubTypeLink : Entity
    {
        [Required]
        public Card Card { get; private set; }
        [Required]
        public CardSubType CardSubType { get; private set; }
    }
}
