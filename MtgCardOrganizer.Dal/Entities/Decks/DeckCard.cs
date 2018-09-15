using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Dal.Entities.Decks
{
    public class DeckCard : Entity
    {
        public int DeckId { get; set; }
        public int CardId { get; set; }

        public Deck Deck { get; set; }
        public Card Card { get; set; }

        public DeckPart Part { get; set; }
        public int Count { get; set; }
    }
}
