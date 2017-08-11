using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MtgTester
{
    public class MagicMadhouseConnector
    {
        private HttpClient _httpClient;

        public MagicMadhouseConnector()
        {
            _httpClient = new HttpClient();
        }

        public void Begin()
        {
            while (true)
            {
                Console.Write("Search Input: ");
                var searchString = Console.ReadLine();
                if (searchString == "") break;
                var connector = new MagicMadhouseConnector();
                var prices = connector.ExtractPrices(searchString);
                if (prices.Count == 0)
                    Console.WriteLine("No Results");
                foreach (var kvp in prices)
                {
                    Console.WriteLine("Product: " + kvp.Key);
                    Console.WriteLine("Price: £" + kvp.Value);
                }
                Console.WriteLine();
            }
        }

        public Dictionary<string, double> ExtractPrices(string searchString)
        {
            var resultDict = new Dictionary<string, double>();
            dynamic nestedObject = PerformCardQuery(searchString);
            if (nestedObject.ContainsKey("too_many_products") && nestedObject["too_many_products"])
            {
                Console.WriteLine("Too many results");
            }
            else if (nestedObject.ContainsKey("error"))
            {
            }
            else
            {
                foreach (var obj in nestedObject["products"])
                {
                    if (obj["title"].ToLower().Contains(searchString.ToLower()) && !resultDict.ContainsKey(obj["title"]))
                        resultDict.Add(obj["title"], ExtractPriceField(obj["price"]));
                }
            }
            return resultDict;
        }

        private object PerformCardQuery(string searchString)
        {
            var unixTime = DateTime.Now.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
            var unixTimeMillis = Math.Floor(unixTime * 1000);
            string searchQueryString = "https://www.magicmadhouse.co.uk/autocomplete/search/json?" + unixTimeMillis + "&q=" + searchString;
            var request = new HttpRequestMessage(HttpMethod.Get, searchQueryString);
            var response = _httpClient.SendAsync(request).Result;
            var jsonString = response.Content.ReadAsStringAsync().Result;
            return JsonHelper.Deserialize(jsonString);
        }

        private double ExtractPriceField(string jsonString)
        {
            var startIndex = jsonString.IndexOf("£");
            var cutString = jsonString.Substring(startIndex + 1);
            var finalIndex = cutString.IndexOf('<');
            var priceString = cutString.Substring(0, finalIndex);
            return double.Parse(priceString);
        }

        private string DummyString = @"{""products"":[{""id"":""37655"",""title"":""Wolfir Silverheart"",""url"":""\/magic-the-gathering-wolfir-silverheart-p37655"",""type"":""product"",""subtitle"":"""",""image"":""\/images\/magic-the-gathering-wolfir-silverheart-p37655-123178_thumbmini.jpg"",""show_image"":""Y"",""reference"":""MAVR1206_GR"",""on_sale"":false,""price"":""Up to <span class=\""product-content__price--inc\"" ><span class=\""GBP\"">\u00a30.99<\/span><\/span><span class=\""product-content__price--ex\""  style=\""display:none;\""><span class=\""GBP\"">\u00a30.83<\/span><\/span>"",""show_price"":""Y""},{""id"":""38019"",""title"":""Wolfir Silverheart (foil)"",""url"":""\/magic-the-gathering-wolfir-silverheart-foil-p38019"",""type"":""product"",""subtitle"":"""",""image"":""\/images\/magic-the-gathering-wolfir-silverheart-foil-p38019-123422_thumbmini.jpg"",""show_image"":""Y"",""reference"":""NF_AVR1206_GR"",""on_sale"":false,""price"":""Up to <span class=\""product-content__price--inc\"" ><span class=\""GBP\"">\u00a32.49<\/span><\/span><span class=\""product-content__price--ex\""  style=\""display:none;\""><span class=\""GBP\"">\u00a32.08<\/span><\/span>"",""show_price"":""Y""},{""id"":""40557"",""title"":""Return to Ravnica Event Deck - Golgari: Creep and Conquer"",""url"":""\/magic-the-gathering-return-to-ravnica-event-deck-golgari-creep-and-conquer-p40557"",""type"":""product"",""subtitle"":"""",""image"":""\/images\/magic-the-gathering-return-to-ravnica-event-deck-golgari-creep-and-conquer-p40557-121339_thumbmini.jpg"",""show_image"":""Y"",""reference"":""MZZRTRED2"",""on_sale"":false,""price"":""<span class=\""product-content__price--inc\"" ><span class=\""GBP\"">\u00a324.95<\/span><\/span><span class=\""product-content__price--ex\""  style=\""display:none;\""><span class=\""GBP\"">\u00a320.79<\/span><\/span>"",""show_price"":""Y""},{""id"":""44496"",""title"":""Gatecrash Event Deck - Simic: Thrive and Thrash"",""url"":""\/magic-the-gathering-gatecrash-event-deck-simic-thrive-and-thrash-p44496"",""type"":""product"",""subtitle"":"""",""image"":""\/images\/magic-the-gathering-gatecrash-event-deck-simic-thrive-and-thrash-p44496-121337_thumbmini.jpg"",""show_image"":""Y"",""reference"":""MZZGTCED2"",""on_sale"":false,""price"":""<span class=\""product-content__price--inc\"" ><span class=\""GBP\"">\u00a319.95<\/span><\/span><span class=\""product-content__price--ex\""  style=\""display:none;\""><span class=\""GBP\"">\u00a316.63<\/span><\/span>"",""show_price"":""Y""},{""id"":""37591"",""title"":""Avacyn Restored Intro Pack - Bound by Strength"",""url"":""\/magic-the-gathering-avacyn-restored-intro-pack-bound-by-strength-p37591"",""type"":""product"",""subtitle"":"""",""image"":""\/images\/magic-the-gathering-avacyn-restored-intro-pack-bound-by-strength-p37591-121357_thumbmini.jpg"",""show_image"":""Y"",""reference"":""MZZIPAVRWS"",""on_sale"":false,""price"":""<span class=\""product-content__price--inc\"" ><span class=\""GBP\"">\u00a318.95<\/span><\/span><span class=\""product-content__price--ex\""  style=\""display:none;\""><span class=\""GBP\"">\u00a315.79<\/span><\/span>"",""show_price"":""Y""}],""categories"":[{""id"":""1"",""title"":""Magic the Gathering"",""count"":""5"",""url"":""\/search\/magic-the-gathering-c1\/wolfir-silverheart"",""type"":""category"",""tree"":""Magic the Gathering""}],""manufacturers"":[{""id"":""42"",""title"":""Magic: the Gathering"",""count"":""2"",""url"":""\/search\/magic-the-gathering-m42\/wolfir-silverheart"",""type"":""manufacturer""}],""products_count"":5,""categories_count"":1,""manufacturers_count"":1,""search_term"":""Wolfir Silverheart"",""search_term_encoded"":""wolfir-silverheart""}";
    }
}
