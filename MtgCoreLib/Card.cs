using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MtgCoreLib
{
    public class Card
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Cost { get; set; }
        public List<string> Types { get; set; }
        public List<string> SubTypes { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }

        public string Text { get; set; }
        public string Edition { get; set; }
        public string Rarity { get; set; }
        public string Artist { get; set; }
        public string Num { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}
