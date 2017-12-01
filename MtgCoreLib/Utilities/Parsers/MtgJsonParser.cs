using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using MtgCoreLib.Dtos.Cards;
using Newtonsoft.Json;

namespace MtgCoreLib.Utilities.Parsers
{
    public class MtgJsonParser
    {
        private readonly string DownloadFilename = "cards.json.zip";

        private readonly Uri AllCardsUri = new Uri("https://mtgjson.com/json/AllCards.json.zip");
        private readonly Uri AllCardsAndExtrasUri = new Uri("https://mtgjson.com/json/AllCards-x.json.zip");

        public IEnumerable<CardDto> Parse(string mtgJsonText) 
        {
            JsonConvert.DeserializeObject(mtgJsonText);
            return null; // TODO
        }

        public string DownloadAndUnzip()
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