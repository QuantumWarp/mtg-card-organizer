using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Cards
{
    public class CardOtherInfoDto : EntityDto
    {
        public bool Foil { get; set; }
        public bool Promo { get; set; }
    }
}
