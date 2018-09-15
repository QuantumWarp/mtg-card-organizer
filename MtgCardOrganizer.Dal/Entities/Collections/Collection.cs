using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Dal.Entities.Collections
{
    public class Collection : Entity
    {        
        public string Name { get; set; }

        public int? ContainerId { get; set; }
        public Container Container { get; set; }

        public ICollection<CardInstance> CardInstances { get; set; }
    }
}
