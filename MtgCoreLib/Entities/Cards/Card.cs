using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;

namespace MtgCoreLib.Entities.Cards
{
    public class Card : Entity
    {        
        public string CardId { get; set; }
        [Required]
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string ConvertedManaCost { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }

        public ICollection<CardType> CardTypes { get; private set; }
        public ICollection<CardSubType> CardSubTypes { get; private set; }

        public ICollection<CardSetInfo> CardSetInfos { get; private set; }

        public Card(CardDto cardDto) {
            CardId = cardDto.CardId;
            Name = cardDto.Name;
            ManaCost = cardDto.ManaCost;
            ConvertedManaCost = cardDto.ConvertedManaCost;
            Power = cardDto.Power;
            Toughness = cardDto.Toughness;
            OracleText = cardDto.OracleText;
        }

        public CardDto AsDto() {
            return new CardDto {
                CardId = CardId,
                Name = Name,
                ManaCost = ManaCost,
                ConvertedManaCost = ConvertedManaCost,
                Power = Power,
                Toughness = Toughness,
                OracleText = OracleText,
            };
        }
    }
}
