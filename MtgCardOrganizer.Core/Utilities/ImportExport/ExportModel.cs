using System.Collections.Generic;
using Newtonsoft.Json;

public class CollectionExportModel {
    public string Name { get; set; }
    public List<CollectionExportModel> SubCollections { get; set; }
    public List<CardInstanceExportModel> Cards { get; set; }
}

public class CardInstanceExportModel {
    public string Name { get; set; }
    public string SetName { get; set; }
    public string Num { get; set; }

    // Card Specific Info
    public bool Foil { get; set; }
    public bool Promo { get; set; }
}
