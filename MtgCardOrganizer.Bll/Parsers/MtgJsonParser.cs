using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;

namespace MtgCardOrganizer.Bll.Parsers
{
    public class MtgJsonParser : IParser
    {
        private readonly string DownloadFilename = "../AllSets-x.json.zip";

        private readonly Uri AllCardsUri = new Uri("https://mtgjson.com/json/AllSets.json.zip");
        private readonly Uri AllCardsAndExtrasUri = new Uri("https://mtgjson.com/json/AllSets-x.json.zip");

        public List<Set> Sets { get; } = new List<Set>();
        public List<Card> Cards { get; } = new List<Card>();
        public List<CardSet> CardSets { get; } = new List<CardSet>();

        public void Parse(string mtgJsonText) 
        {
            var sets = (Dictionary<string, dynamic>)JsonHelper.Deserialize(mtgJsonText);
            foreach (var setObj in sets) 
            {
                ParseSingleSet(setObj.Value);
            }
        }

        private void ParseSingleSet(Dictionary<string, dynamic> setObj)
        {
            var newSet = new Set {
                Code = setObj["code"].ToString(),
                Name = setObj["name"].ToString(),
            };
            Sets.Add(newSet);

            foreach (var cardObj in setObj["cards"])
            {
                ParseSingleCard(cardObj, newSet);
            }
        }

        private void ParseSingleCard(Dictionary<string, dynamic> cardObj, Set set)
        {
            var card = new Card();

            card.Name = cardObj["name"].ToString();
            if (cardObj.ContainsKey("manaCost")) card.ManaCost = cardObj["manaCost"].ToString();
            card.ConvertedManaCost = cardObj["cmc"].ToString();
            if (cardObj.ContainsKey("power")) card.Power = cardObj["power"].ToString();
            if (cardObj.ContainsKey("toughness")) card.Toughness = cardObj["toughness"].ToString();

            var cardSet = new CardSet();
            cardSet.Artist = cardObj["artist"].ToString();
            if (cardObj.ContainsKey("number")) cardSet.Num = cardObj["number"].ToString();
            cardSet.Rarity = ParseRarity(cardObj["rarity"].ToString());
            if (cardObj.ContainsKey("multiverseid")) cardSet.MultiverseId = cardObj["multiverseid"].ToString();
            cardSet.Card = card;
            cardSet.Set = set;

            Cards.Add(card);
            CardSets.Add(cardSet);
        }
        
        public Rarity ParseRarity(string rarityString) {
            switch (rarityString) {
                case "Common": return Rarity.Common;
                case "Uncommon": return Rarity.Uncommon;
                case "Rare": return Rarity.Rare;
                case "Mythic Rare": return Rarity.Mythic;
                default: return Rarity.Common;
            }
        }

        public string Retrieve()
        {
            if (!File.Exists("../AllSets-x.json"))
            {
                using (var client = new WebClient())
                {
                    client.DownloadFile(AllCardsAndExtrasUri, DownloadFilename);
                    
                }
                ZipFile.ExtractToDirectory(DownloadFilename, "../");
            }
            return File.ReadAllText("../AllSets-x.json");
        }
    }
}