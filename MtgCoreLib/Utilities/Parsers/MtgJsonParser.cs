using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using MtgCoreLib.Dtos.Cards;
using Newtonsoft.Json;
using MtgCoreLib.Utilities.General;

namespace MtgCoreLib.Utilities.Parsers
{
    public class MtgJsonParser : IParser
    {
        private readonly string DownloadFilename = "cards.json.zip";

        private readonly Uri AllCardsUri = new Uri("https://mtgjson.com/json/AllSets.json.zip");
        private readonly Uri AllCardsAndExtrasUri = new Uri("https://mtgjson.com/json/AllSets-x.json.zip");

        public List<SetDto> SetDtos { get; } = new List<SetDto>();
        public List<CardDto> CardDtos { get; } = new List<CardDto>();
        public List<CardSetInfoDto> CardSetInfoDtos { get; } = new List<CardSetInfoDto>();

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
            var setId = setObj["code"].ToString();

            SetDtos.Add(new SetDto {
                SetId = setId,
                Code = setObj["code"].ToString(),
                Name = setObj["name"].ToString(),
            });

            foreach (var cardObj in setObj["cards"])
            {
                ParseSingleCard(cardObj, setId);
            }
        }

        private void ParseSingleCard(Dictionary<string, dynamic> cardObj, string setId)
        {
            var cardDto = new CardDto();
            cardDto.CardId = cardObj["id"].ToString();
            cardDto.Name = cardObj["name"].ToString();
            if (cardObj.ContainsKey("manaCost")) cardDto.ManaCost = cardObj["manaCost"].ToString();
            cardDto.ConvertedManaCost = cardObj["cmc"].ToString();
            if (cardObj.ContainsKey("power")) cardDto.Power = cardObj["power"].ToString();
            if (cardObj.ContainsKey("toughness")) cardDto.Toughness = cardObj["toughness"].ToString();

            var cardSetInfoDto = new CardSetInfoDto();
            cardSetInfoDto.CardId = cardObj["id"].ToString();
            cardSetInfoDto.Artist = cardObj["artist"].ToString();
            cardSetInfoDto.SetId = setId;

            CardDtos.Add(cardDto);
            CardSetInfoDtos.Add(cardSetInfoDto);
        }

        public string Retrieve()
        {
            using (var client = new WebClient())
            {
                client.DownloadFile(AllCardsUri, DownloadFilename);
            }
            ZipFile.ExtractToDirectory(DownloadFilename, "./");
            return File.ReadAllText("./");
        }
    }
}