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
        private readonly string DownloadFilename = "../AllSets.json.zip";
        
        private readonly Uri AllCardsAndExtrasUri = new Uri("https://mtgjson.com/json/AllSets.json.zip");

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
            if (cardObj.ContainsKey("convertedManaCost")) card.ConvertedManaCost = cardObj["convertedManaCost"].ToString();
            if (cardObj.ContainsKey("power")) card.Power = cardObj["power"].ToString();
            if (cardObj.ContainsKey("toughness")) card.Toughness = cardObj["toughness"].ToString();
            if (cardObj.ContainsKey("text")) card.Text = cardObj["text"].ToString();
            if (cardObj.ContainsKey("type")) card.Text = cardObj["type"].ToString();

            var cardSet = new CardSet();
            if (cardObj.ContainsKey("artist")) cardSet.Artist = cardObj["artist"].ToString();
            if (cardObj.ContainsKey("number")) cardSet.Num = cardObj["number"].ToString();
            if (cardObj.ContainsKey("rarity")) cardSet.Rarity = ParseRarity(cardObj["rarity"].ToString());
            if (cardObj.ContainsKey("multiverseId")) cardSet.MultiverseId = cardObj["multiverseId"].ToString();
            cardSet.Card = card;
            cardSet.Set = set;

            Cards.Add(card);
            CardSets.Add(cardSet);
        }
        
        public Rarity? ParseRarity(string rarityString) {
            switch (rarityString.ToLower())
            {
                case "basic": return Rarity.Basic;
                case "common": return Rarity.Common;
                case "uncommon": return Rarity.Uncommon;
                case "rare": return Rarity.Rare;
                case "mythic": return Rarity.Mythic;
                default: return null;
            }
        }

        public string Retrieve()
        {
            if (!File.Exists("../AllSets.json"))
            {
                using (var client = new WebClient())
                {
                    client.DownloadFile(AllCardsAndExtrasUri, DownloadFilename);
                    
                }
                ZipFile.ExtractToDirectory(DownloadFilename, "../");
            }
            return File.ReadAllText("../AllSets.json");
        }
    }
}