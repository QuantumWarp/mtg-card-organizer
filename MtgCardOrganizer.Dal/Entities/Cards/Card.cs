using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Decks;

namespace MtgCardOrganizer.Dal.Entities.Cards
{
    public class Card : Entity
    {
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string ConvertedManaCost { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }

        public ICollection<CardSet> CardSets { get; set; }
        public ICollection<DeckCard> DeckCards { get; set; }
    }
}
