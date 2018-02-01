using MtgCoreLib.Entities.Other;
using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using MtgCoreLib.Entities.Collections;

namespace MtgCoreLib.Entities.Cards
{
    public class CardOtherInfo : Entity
    {
        [Required]
        public bool Foil { get; private set; }
        [Required]
        public bool Promo { get; private set; }

        public CardOtherInfo() { }

        public CardOtherInfo(CardOtherInfoDto cardSetInfoDto) {
            Foil = cardSetInfoDto.Foil;
            Promo = cardSetInfoDto.Promo;
        }
    }
}
