using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Cards;

namespace MtgCardOrganizer.Core.Entities.Collections
{
    public class Deck : Entity
    {        
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public string OwnerUserId { get; set; }

        public int? ParentId { get; set; }
        public Collection Parent { get; set; }

        public ICollection<CardSet> Main { get; set; }
        public ICollection<CardSet> Sideboard { get; set; }
    }
}
