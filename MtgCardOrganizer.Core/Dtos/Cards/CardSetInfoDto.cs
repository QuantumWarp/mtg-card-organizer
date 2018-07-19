using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Cards
{
    public class CardSetInfoDto : EntityDto
    {
        public int CardId { get; set; }
        public string Num { get; set; }
        public int SetId { get; set; }
        public Rarity Rarity { get; set; }
        public string Artist { get; set; }
        public string MultiverseId { get; set; }
    }
}
