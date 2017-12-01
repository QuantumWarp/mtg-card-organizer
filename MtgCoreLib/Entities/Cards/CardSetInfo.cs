using MtgCoreLib.Entities.Other;
using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities.Cards
{
    public class CardSetInfo : Entity
    {
        [Required]
        public Card Card { get; private set; }
        [Required]
        public int MultiverseId { get; private set; }
        [Required]
        public string Num { get; private set; }
        [Required]
        public Rarity Rarity { get; private set; }
        [Required]
        public Set Set { get; private set; }        
    }
}
