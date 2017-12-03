using Microsoft.VisualStudio.TestTools.UnitTesting;
using MtgCoreLib.Utilities.Parsers;
using System.Linq;
using System.IO;

namespace MtgCoreLib.Tests.Parsers
{
    [TestClass]
    public class MtgJsonParserTests
    {
        //[TestMethod]
        public void TestParsing()
        {
            var parser = new MtgJsonParser();
            parser.Parse(TestJson);
            var cards = parser.CardDtos;
            Assert.IsTrue(cards.Count() > 0, "No cards parsed");
        }

        [TestMethod]
        public void TestParsingZip ()
        {
          var parser = new MtgJsonParser();
          var zipString = File.ReadAllText(@"C:\Users\jwlow\Documents\Git\mtg-card-organizer\AllSets-x.json\AllSets-x.json");
          Assert.IsTrue(zipString != null && zipString.Length > 0);
          parser.Parse(zipString);
          Assert.IsTrue(parser.CardDtos.Count() > 0);
        }
    }
}
