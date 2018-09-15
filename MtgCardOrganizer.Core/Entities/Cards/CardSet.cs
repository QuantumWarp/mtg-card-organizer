using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Enums;

namespace MtgCardOrganizer.Core.Entities.Cards
{
    public class CardSet : Entity
    {
        public string MultiverseId { get; set; }
        public string Artist { get; set; }
        public string Num { get; set; }
        public Rarity Rarity { get; set; }
        
        public int CardId { get; set; }
        public int SetId { get; set; }
        public Card Card { get; set; }
        public Set Set { get; set; }

        public ICollection<CardInstance> CardInstances { get; set; }
    }
}
