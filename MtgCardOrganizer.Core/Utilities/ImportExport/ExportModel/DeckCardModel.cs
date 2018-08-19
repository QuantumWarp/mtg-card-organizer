using MtgCardOrganizer.Core.Entities.Decks;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class DeckCardModel
    {
        public string Name { get; set; }
        public int Count { get; set; }

        public DeckCardModel(DeckCard deckCard)
        {
            this.Name = deckCard.Card.Name;
            this.Count = deckCard.Count;
        }
    }
}
