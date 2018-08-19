using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Decks;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class DeckExportModel
    {
        public string Name { get; set; }
        public List<DeckCardModel> Main { get; set; }
        public List<DeckCardModel> Sideboard { get; set; }

        public DeckExportModel(Deck deck)
        {
            this.Name = deck.Name;
        }

        public Deck ToDeck()
        {
            return new Deck {
                Name = this.Name,
            };
        }
    }
}
