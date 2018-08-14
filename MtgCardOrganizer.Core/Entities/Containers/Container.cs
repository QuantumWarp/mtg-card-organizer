using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Entities.Decks;

namespace MtgCardOrganizer.Core.Entities.Containers
{
    public class Container : Entity
    {        
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public string OwnerUserId { get; set; }

        public int? ParentId { get; set; }
        public Container Parent { get; set; }

        public ICollection<Container> SubContainers { get; set; }
        public ICollection<Collection> Collections { get; set; }
        public ICollection<Deck> Decks { get; set; }

        public ICollection<ContainerUserLink> ContainerUserLinks { get; set; }
    }
}
