using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.Entities.Collections
{
    public class CollectionCardLink : Entity
    {
        public int CollectionId { get; set; }
        public int CardInstanceId { get; set; }
        public Collection Collection { get; set; }
        public CardInstance CardInstance { get; set; }
    }
}
