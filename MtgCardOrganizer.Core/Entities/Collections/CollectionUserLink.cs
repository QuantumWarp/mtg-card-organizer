using MtgCardOrganizer.Core.Enums;

namespace MtgCardOrganizer.Core.Entities.Collections
{
    public class CollectionUserLink
    {
        public string UserId { get; set; }
        public Permission Permission { get; set; }

        public int CollectionId { get; set; }
        public Collection Collection { get; set; }
    }
}
