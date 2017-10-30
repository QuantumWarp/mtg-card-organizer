using System;
using System.Collections.Generic;
using System.Text;

namespace MtgCoreLib.Dtos.Cards
{
    public class CardSetInfoDto
    {
        public string CardId { get; set; }
        public string Name { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }
        public string Cost { get; set; }
    }
}
