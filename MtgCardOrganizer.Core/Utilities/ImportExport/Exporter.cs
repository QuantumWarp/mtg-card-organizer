using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Initialization;
using MtgCoreLib.Managers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class Exporter {
    private CollectionManager _collectionManager;
    private SetManager _setManager;

    private List<SetDto> _sets;

    public Exporter(CollectionManager collectionManager, SetManager setManager) {
        _collectionManager = collectionManager;
        _setManager = setManager;
    }

    public string ConstructExport(int collectionId) {
        _sets = _setManager.GetSets(new QueryModel<SetDto>()).Data.ToList();
        var collectionDtos = _collectionManager.GetCollections(new QueryModel<CollectionDto>() { Filters = new [] { new PropertyFilter<CollectionDto>() { 
            Property = "Id",
            Operator = PropertyFilterOperator.IsEqual,
            Value = collectionId.ToString()
        }}});       
        return JsonConvert.SerializeObject(this.ConstructExportModel(collectionDtos.Data.First()), Formatting.Indented);        
    }

    private CollectionExportModel ConstructExportModel(CollectionDto collectionDto) {
        var model = new CollectionExportModel();
        model.Name = collectionDto.Name;

        var cardDetailsDtos = _collectionManager.GetCards(collectionDto.Id, new QueryModel<CardInstanceDto>());
        model.Cards = cardDetailsDtos.Data.Select(x => {
            var card = new CardInstanceExportModel();
            card.Name = x.Name;
            card.SetName = _sets.Single(set => set.Id == x.SetId).Name;
            card.Num = x.Num;
            card.Foil = x.Foil;
            card.Promo = x.Promo;
            return card;
        }).ToList();

        var subCollectionDtos = _collectionManager.GetCollections(new QueryModel<CollectionDto>() { Filters = new [] { new PropertyFilter<CollectionDto>() { 
            Property = "ParentId",
            Operator = PropertyFilterOperator.IsEqual,
            Value = collectionDto.Id.ToString()
        }}});       
        model.SubCollections = subCollectionDtos.Data.Select(x => ConstructExportModel(x)).ToList();        
        return model;
    }
}
