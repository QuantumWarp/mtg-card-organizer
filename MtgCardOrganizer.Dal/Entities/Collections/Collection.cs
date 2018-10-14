using MtgCardOrganizer.Dal.Entities.Containers;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Entities.Collections
{
    public class Collection : Entity
    {        
        public string Name { get; set; }

        public int ContainerId { get; set; }
        public Container Container { get; set; }

        public ICollection<CardInstance> CardInstances { get; set; }

        public ICollection<CollectionUserFavorite> CollectionUserFavorites { get; set; }
    }
}
