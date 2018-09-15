using MtgCardOrganizer.Dal.Entities.Decks;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class DeckCardExportModel
    {
        public string Name { get; set; }
        public int Count { get; set; }

        public DeckCardExportModel() { }
        public DeckCardExportModel(DeckCard deckCard)
        {
            this.Name = deckCard.Card.Name;
            this.Count = deckCard.Count;
        }
    }
}
