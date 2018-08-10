using System.Collections.Generic;

namespace MtgCardOrganizer.Core.Entities.Collections
{
    public class Collection : Entity
    {        
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public string OwnerUserId { get; set; }

        public int? ParentId { get; set; }
        public Collection Parent { get; set; }

        public ICollection<CollectionCardLink> CollectionCardLinks { get; set; }
        public ICollection<Collection> SubCollections { get; set; }
        public ICollection<CollectionUserLink> CollectionUserLinks { get; set; }
    }
}
