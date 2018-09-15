using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Collections;

namespace MtgCardOrganizer.Dal.Entities.Collections
{
    public class CardInstance : Entity
    {
        public bool Foil { get; set; }
        public bool Promo { get; set; }

        public int CardSetId { get; set; }
        public int CollectionId { get; set; }
        public CardSet CardSet { get; set; }
        public Collection Collection { get; set; }
    }
}
