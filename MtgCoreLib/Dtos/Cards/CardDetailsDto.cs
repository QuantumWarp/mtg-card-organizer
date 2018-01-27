using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Cards
{
    public class CardDetailsDto
    {
        // Card
        public int CardId { get; set; }
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string ConvertedManaCost { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }
        public string Type { get; set; }

        // Card Set Info
        public int CardSetInfoId { get; set; }
        public string Num { get; set; }
        public int SetId { get; set; }
        public Rarity Rarity { get; set; }
        public string Artist { get; set; }
    }
}
