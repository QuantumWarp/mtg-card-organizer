using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Dal.Entities.Collections
{
    public class CardInstanceGroupedCard
    {
        public Card Card { get; set; }
        public int Count { get; set; }
    }
}
