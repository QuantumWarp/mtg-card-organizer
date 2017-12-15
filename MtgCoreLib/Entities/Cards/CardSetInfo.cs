using MtgCoreLib.Entities.Other;
using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;
using System.ComponentModel.DataAnnotations.Schema;

namespace MtgCoreLib.Entities.Cards
{
    public class CardSetInfo : Entity
    {
        [ForeignKey(nameof(Card))]
        public int CardId { get; private set; }
        [Required]
        public Card Card { get; set; }
        
        [Required]
        public string Artist { get; private set; }
        public string Num { get; private set; }
        [Required]
        public Rarity Rarity { get; private set; }

        [ForeignKey(nameof(Set))]
        public int SetId { get; private set; }
        [Required]
        public Set Set { get; set; }

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
