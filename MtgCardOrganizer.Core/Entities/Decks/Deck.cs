using System.Collections.Generic;
using System.Linq;
using MtgCardOrganizer.Core.Entities.Containers;

namespace MtgCardOrganizer.Core.Entities.Decks
{
    public class Deck : Entity
    {        
        public string Name { get; set; }

        public int? ContainerId { get; set; }
        public Container Container { get; set; }

        public ICollection<DeckCard> Cards { get; set; }

        public List<DeckCard> GetMain() 
        {
            return Cards.Where(x => x.Part == DeckPart.Main).ToList();
        }
        
        public List<DeckCard> GetSideboard() 
        {
            return Cards.Where(x => x.Part == DeckPart.Sideboard).ToList();
        }
    }
}
