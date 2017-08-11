using System;
using System.Linq;
using MtgCoreLib.DataManagers;
using MtgCoreLib.Import;
using MtgCoreLib;

namespace MtgTester
{
    class Program
    {
        static void Main(string[] args)
        {
            var conn = new DbConnector();
            conn.Connect();
            ShowAllAndCount(conn);
            Console.ReadLine();
        }

        static void ShowAllAndCount(DbConnector conn)
        {
            var cards = conn.GetAllItems<Card>().ToList();
            foreach (var card in cards)
                Console.WriteLine(card.Name);
            Console.WriteLine(cards.Count);
        }

        static void RipAll(DbConnector conn)
        {
            var ripper = new MagicAssistantXmlRipper(@"D:\Program Files\Games\MagicAssistant\Workspace\magiccards\MagicDB");
            var cards = ripper.RipAll().ToList();
            foreach (var card in cards)
            {
                conn.Upsert(card);
                Console.WriteLine($"Updated {card.Name}");
            }
        }
    }
}
