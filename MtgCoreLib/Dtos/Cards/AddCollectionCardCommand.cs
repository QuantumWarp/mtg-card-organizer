using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Cards
{
    public class AddCollectionCardCommand
    {
        public int CardSetInfoId { get; set; }
        public bool Foil { get; set; }
        public bool Promo { get; set; }
    }
}
