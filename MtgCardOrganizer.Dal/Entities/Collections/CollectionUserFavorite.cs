using MtgCardOrganizer.Dal.Entities.Identity;

namespace MtgCardOrganizer.Dal.Entities.Collections
{
    public class CollectionUserFavorite
    {
        public string UserId { get; set; }
        public int CollectionId { get; set; }
        public User User { get; set; }
        public Collection Collection { get; set; }
    }
}
