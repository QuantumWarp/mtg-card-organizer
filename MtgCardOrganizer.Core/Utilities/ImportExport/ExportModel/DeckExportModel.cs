using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Containers;
using MtgCardOrganizer.Core.Entities.Decks;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class DeckExportModel
    {
        public string Name { get; set; }
        public List<DeckCardExportModel> Main { get; set; }
        public List<DeckCardExportModel> Sideboard { get; set; }

        public DeckExportModel() { }
        public DeckExportModel(Deck deck)
        {
            this.Name = deck.Name;
        }

        public Deck ToDeck(Container container)
        {
            return new Deck {
                Name = this.Name,
                Container = container,
            };
        }
    }
}
