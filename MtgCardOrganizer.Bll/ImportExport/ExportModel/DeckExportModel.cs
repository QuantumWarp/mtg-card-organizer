using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Entities.Decks;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class DeckExportModel
    {
        public string Name { get; set; }
        public List<DeckCardExportModel> Main { get; set; }
        public List<DeckCardExportModel> Sideboard { get; set; }

        public DeckExportModel() { }
        public DeckExportModel(Deck deck)
        {
            Name = deck.Name;
        }

        public Deck ToDeck(Container container)
        {
            return new Deck {
                Name = Name,
                ContainerId = container.Id,
            };
        }
    }
}
