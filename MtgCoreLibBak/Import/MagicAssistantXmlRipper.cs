using MtgApiManager.Lib.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace MtgCoreLib.Import
{
    public class MagicAssistantXmlRipper
    {
        private string _dirPath;
        private List<PropertyInfo> _cardClassProperties = typeof(Card).GetProperties().ToList();
        private List<string> _ignoreProperties = new List<string> { "rating", "rulings", "properties" };

        public MagicAssistantXmlRipper(string dirPath)
        {
            _dirPath = dirPath;
        }

        public IEnumerable<Card> RipAll()
        {
            foreach (var filePath in Directory.EnumerateFiles(_dirPath))
                foreach (var card in RipFromFile(filePath))
                    yield return card;
        }

        private IEnumerable<Card> RipFromFile(string filePath)
        {
            var text = File.ReadAllText(filePath);
            var xmlDoc = new XmlDocument();
            xmlDoc.Load(filePath);
            var nodes = xmlDoc.SelectNodes("/cards/list/mc");

            foreach (XmlNode cardDesc in nodes)
            {
                var card = new Card();

                foreach (XmlNode cardPropNode in cardDesc.ChildNodes)
                {
                    if (_ignoreProperties.Contains(cardPropNode.Name))
                        continue;

                    if (cardPropNode.Name == "id")
                        _cardClassProperties.First(pi => pi.Name == "Id").SetValue(card, int.Parse(cardPropNode.InnerText));
                    else if (cardPropNode.Name == "type")
                    {
                        if (cardPropNode.InnerText.Contains("-"))
                            _cardClassProperties.First(pi => pi.Name == "SubTypes").SetValue(card, cardPropNode.InnerText.Split('-')[1].Split(' ').ToList());
                        _cardClassProperties.First(pi => pi.Name == "Types").SetValue(card, cardPropNode.InnerText.Split('-')[0].Split(' ').ToList());
                    }
                    else
                    {
                        var property = _cardClassProperties.FirstOrDefault(pi => pi.Name.ToLower() == cardPropNode.Name.ToLower());
                        if (property == null)
                            throw new Exception($"Create property '{cardPropNode.Name}' for value '{cardPropNode.InnerText}'.");
                        _cardClassProperties.First(pi => pi.Name.ToLower() == cardPropNode.Name.ToLower()).SetValue(card, cardPropNode.InnerText);
                    }
                }

                yield return card;
            }
        }
    }
}
