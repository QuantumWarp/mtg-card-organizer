using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.Entities.Cards
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
