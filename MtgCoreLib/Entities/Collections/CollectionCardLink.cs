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
    public class CollectionCardLink : Entity
    {        
        [Required]
        public int CollectionId { get; set; }
        [Required]
        public int CardSetInfoId { get; set; }
        [Required]
        public int CardOtherInfoId { get; set; }       

        [ForeignKey(nameof(CollectionId))]
        public Collection Collection { get; set; }
        [ForeignKey(nameof(CardSetInfoId))]
        public CardSetInfo CardSetInfo { get; set; }
        [ForeignKey(nameof(CardOtherInfoId))]
        public CardOtherInfo CardOtherInfo { get; set; }

        public CollectionCardLink() { }

        public CollectionCardLink(int collectionId, int cardSetInfoId, int cardOtherInfoId) {
            CollectionId = collectionId;
            CardSetInfoId = cardSetInfoId;
            CardOtherInfoId = cardOtherInfoId;
        }
    }
}
