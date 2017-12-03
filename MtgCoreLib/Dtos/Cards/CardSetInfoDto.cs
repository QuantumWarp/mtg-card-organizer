using System;
using System.Collections.Generic;
using System.Text;

namespace MtgCoreLib.Dtos.Cards
{
    public class CardSetInfoDto
    {
        public string CardId { get; set; }
        public string Artist { get; set; }
        public string SetId { get; set; }
        public string SetNumber { get; set; }
    }
}
