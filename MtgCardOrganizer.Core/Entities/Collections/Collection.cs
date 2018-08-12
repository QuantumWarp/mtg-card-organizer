using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.Entities.Collections
{
    public class Collection : Entity
    {        
        public string Name { get; set; }

        public int? ContainerId { get; set; }
        public Container Container { get; set; }

        public ICollection<CardInstance> CardInstances { get; set; }
    }
}
