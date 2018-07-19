using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;

namespace MtgCoreLib.Entities.Cards
{
    public class Card : Entity
    {        
        [Required]
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string ConvertedManaCost { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }
        public string Type { get; set; }
        // public ICollection<CardType> CardTypes { get; private set; }
        // public ICollection<CardSubType> CardSubTypes { get; private set; }

        public ICollection<CardSetInfo> CardSetInfos { get; set; }

        public Card() { }

        public Card(CardDto cardDto) {
            Name = cardDto.Name;
            ManaCost = cardDto.ManaCost;
            ConvertedManaCost = cardDto.ConvertedManaCost;
            Power = cardDto.Power;
            Toughness = cardDto.Toughness;
            OracleText = cardDto.OracleText;
            Type = cardDto.Type;
        }

        public CardDto AsDto() {
            return new CardDto {
                Id = Id,
                Name = Name,
                ManaCost = ManaCost,
                ConvertedManaCost = ConvertedManaCost,
                Power = Power,
                Toughness = Toughness,
                OracleText = OracleText,
                Type = Type,
            };
        }
    }
}
