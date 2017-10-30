using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MtgCoreLib.Entities.Cards
{
    public class CardTypeLink : Entity
    {
        [Required]
        public Card Card { get; private set; }
        [Required]
        public CardType CardType { get; private set; }
    }
}
