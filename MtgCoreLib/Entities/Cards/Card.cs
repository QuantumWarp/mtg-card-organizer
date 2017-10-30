using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MtgCoreLib.Entities.Cards
{
    public class Card : Entity
    {
        [Required]
        public string Name { get; private set; }
        public string Power { get; private set; }
        public string Toughness { get; private set; }
        public string OracleText { get; private set; }
        public string Cost { get; private set; }

        public ICollection<CardType> CardTypes { get; private set; }
        public ICollection<CardSubType> CardSubTypes { get; private set; }

        public ICollection<CardSetInfo> CardSetInfos { get; private set; }
    }
}
