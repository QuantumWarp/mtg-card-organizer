using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Entities.Cards
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
