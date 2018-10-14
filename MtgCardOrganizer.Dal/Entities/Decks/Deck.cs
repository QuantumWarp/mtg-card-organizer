using System.Collections.Generic;
using System.Linq;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Dal.Entities.Decks
{
    public class Deck : Entity
    {
        public string Name { get; set; }

        public int ContainerId { get; set; }
        public Container Container { get; set; }

        public ICollection<DeckCard> DeckCards { get; set; }

        public List<DeckCard> GetMain() 
        {
            return DeckCards.Where(x => x.Part == DeckPart.Main).ToList();
        }
        
        public List<DeckCard> GetSideboard() 
        {
            return DeckCards.Where(x => x.Part == DeckPart.Sideboard).ToList();
        }
    }
}
