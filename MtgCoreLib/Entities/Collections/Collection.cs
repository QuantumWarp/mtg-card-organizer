using MtgCoreLib.Entities.Other;
using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;
using System.ComponentModel.DataAnnotations.Schema;
using MtgCoreLib.Dtos.Collections;
using System.Collections.Generic;
using MtgCoreLib.Entities.Cards;

namespace MtgCoreLib.Entities.Collections
{
    public class Collection : Entity
    {        
        [Required]
        public string Name { get; set; }
        public int? ParentId { get; set; }

        [NotMapped]
        public bool hasSubCollections { get; set; }
        [NotMapped]
        public bool hasCards { get; set; }
          

        [ForeignKey(nameof(ParentId))]
        public Collection Parent { get; set; }
        // Collection <-> CardSetInfo Many to Many Relationship
        public ICollection<CollectionCardLink> CollectionCardLinks { get; set; }
        // Collection -> Collection One to Many Relationship
        public ICollection<Collection> SubCollections { get; set; }

        public Collection() { }

        public Collection(CollectionDto collectionDto) {
            Name = collectionDto.Name;
            ParentId = collectionDto.ParentId;
        }
    }
}
