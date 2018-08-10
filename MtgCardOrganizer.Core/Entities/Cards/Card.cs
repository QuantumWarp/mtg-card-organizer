using System.Collections.Generic;

namespace MtgCardOrganizer.Core.Entities.Cards
{
    public class Card : Entity
    {
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string ConvertedManaCost { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }
        public string Type { get; set; }

        public ICollection<CardSet> CardSets { get; set; }
    }
}
