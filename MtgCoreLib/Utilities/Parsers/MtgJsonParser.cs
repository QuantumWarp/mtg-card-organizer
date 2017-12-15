using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using MtgCoreLib.Dtos.Cards;
using Newtonsoft.Json;
using MtgCoreLib.Utilities.General;
using MtgCoreLib.Dtos.Enums;
using System.Linq;

namespace MtgCoreLib.Utilities.Parsers
{
    public class MtgJsonParser : IParser
    {
        private readonly string DownloadFilename = "../AllSets-x.json.zip";

        private readonly Uri AllCardsUri = new Uri("https://mtgjson.com/json/AllSets.json.zip");
        private readonly Uri AllCardsAndExtrasUri = new Uri("https://mtgjson.com/json/AllSets-x.json.zip");

        public List<SetDto> SetDtos { get; } = new List<SetDto>();
        public List<CardDto> CardDtos { get; } = new List<CardDto>();
        public List<CardSetInfoDto> CardSetInfoDtos { get; } = new List<CardSetInfoDto>();

        public Dictionary<CardSetInfoDto, SetDto> SetRelationship { get; }  = new Dictionary<CardSetInfoDto, SetDto>();
        public Dictionary<CardSetInfoDto, CardDto> CardRelationship { get; } = new Dictionary<CardSetInfoDto, CardDto>();

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
            var newSet = new SetDto {
                Code = setObj["code"].ToString(),
                Name = setObj["name"].ToString(),
            };
            SetDtos.Add(newSet);

            foreach (var cardObj in setObj["cards"])
            {
                ParseSingleCard(cardObj, newSet);
            }
        }

        private void ParseSingleCard(Dictionary<string, dynamic> cardObj, SetDto setDto)
        {
            var cardDto = new CardDto();

            cardDto.Name = cardObj["name"].ToString();
            if (cardObj.ContainsKey("manaCost")) cardDto.ManaCost = cardObj["manaCost"].ToString();
            cardDto.ConvertedManaCost = cardObj["cmc"].ToString();
            if (cardObj.ContainsKey("power")) cardDto.Power = cardObj["power"].ToString();
            if (cardObj.ContainsKey("toughness")) cardDto.Toughness = cardObj["toughness"].ToString();

            var cardSetInfoDto = new CardSetInfoDto();
            cardSetInfoDto.Artist = cardObj["artist"].ToString();
            if (cardObj.ContainsKey("number")) cardSetInfoDto.Num = cardObj["number"].ToString();
            cardSetInfoDto.Rarity = RarityExtensions.Parse(cardObj["rarity"].ToString());

            CardDtos.Add(cardDto);
            CardSetInfoDtos.Add(cardSetInfoDto);

            SetRelationship.Add(cardSetInfoDto, setDto);
            CardRelationship.Add(cardSetInfoDto, cardDto);
        }

        public string Retrieve()
        {
            // using (var client = new WebClient())
            // {
            //     client.DownloadFile(AllCardsUri, DownloadFilename);
            // }
            if (!File.Exists("../AllSets-x.json"))
            {
                ZipFile.ExtractToDirectory(DownloadFilename, "../");
            }
            return File.ReadAllText("../AllSets-x.json");
        }
    }
}