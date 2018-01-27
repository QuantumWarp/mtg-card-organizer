using MtgCoreLib.Entities.Other;
using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using MtgCoreLib.Entities.Collections;

namespace MtgCoreLib.Entities.Cards
{
    public class CardSetInfo : Entity
    {
        [Required]
        public int CardId { get; private set; }     
        [Required]
        public string Artist { get; private set; }
        public string Num { get; private set; }
        [Required]
        public Rarity Rarity { get; private set; }
        [Required]
        public int SetId { get; private set; }
        
        [ForeignKey(nameof(CardId))]
        public Card Card { get; set; }   
        [ForeignKey(nameof(SetId))]
        public Set Set { get; set; }

        // Collection <-> CardSetInfo Many to Many Relationship
        public ICollection<CollectionCardLink> CollectionCardLinks { get; set; }

        public CardSetInfo() { }

        public CardSetInfo(Set set, Card card, CardSetInfoDto cardSetInfoDto) {
            Card = card;
            Set = set;
            Num = cardSetInfoDto.Num;
            Artist = cardSetInfoDto.Artist;
            Rarity = cardSetInfoDto.Rarity;
            SetId = cardSetInfoDto.SetId;
            CardId = cardSetInfoDto.CardId;
        }

        public CardSetInfoDto AsDto() {
            return new CardSetInfoDto {
                Id = Id,
                CardId = CardId,
                Num = Num,
                Artist = Artist,
                Rarity = Rarity,
                SetId = SetId,
            };
        }
    }
}
