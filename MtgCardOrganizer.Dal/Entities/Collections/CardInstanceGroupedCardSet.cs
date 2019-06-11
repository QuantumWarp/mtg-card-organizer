using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Dal.Entities.Collections
{
    public class CardInstanceGroupedCardSet
    {
        public CardSet CardSet { get; set; }

        public int Count { get; set; }
        public int FoilCount { get; set; }
    }
}
