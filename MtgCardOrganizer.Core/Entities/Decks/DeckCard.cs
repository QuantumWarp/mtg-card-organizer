using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.Entities.Decks
{
    public class DeckCard : Entity
    {
        public Deck Deck { get; set; }
        public Card Card { get; set; }

        public DeckPart Part { get; set; }
        public int Count { get; set; }
    }
}
