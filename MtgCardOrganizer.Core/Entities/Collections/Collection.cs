using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.Entities.Collections
{
    public class Collection : Entity
    {        
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public string OwnerUserId { get; set; }

        public int? ParentId { get; set; }
        public Collection Parent { get; set; }

        public ICollection<Collection> SubCollections { get; set; }
        public ICollection<Deck> Decks { get; set; }
        public ICollection<CardInstance> CardInstances { get; set; }

        public ICollection<CollectionUserLink> CollectionUserLinks { get; set; }
    }
}
