using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Initialization;
using MtgCoreLib.Managers;
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
        _sets = _setManager.GetSets(new PageSortFilter()).Data.ToList();
        var collectionDtos = _collectionManager.GetCollections(new PageSortFilter() { Filters = new [] { new PropertyFilter() { 
            Property = "Id",
            Operator = PropertyFilterOperator.IsEqual,
            Value = collectionId.ToString()
        }}});       
        return this.ConstructExport(collectionDtos.Data.First()).ToString();        
    }

    private JObject ConstructExport(CollectionDto collectionDto) {
        dynamic obj = new JObject();
        obj.name = collectionDto.Name;

        var cardDetailsDtos = _collectionManager.GetCards(collectionDto.Id, new PageSortFilter());
        obj.cards = new JArray(cardDetailsDtos.Data.Select(x => {
            dynamic cardObj = new JObject();
            cardObj.name = x.Name;
            cardObj.setName = _sets.Single(set => set.Id == x.SetId).Name;
            cardObj.num = x.Num;
            return cardObj;
        }));

        var subCollectionDtos = _collectionManager.GetCollections(new PageSortFilter() { Filters = new [] { new PropertyFilter() { 
            Property = "ParentId",
            Operator = PropertyFilterOperator.IsEqual,
            Value = collectionDto.Id.ToString()
        }}});       
        obj.subCollections = new JArray(subCollectionDtos.Data.Select(x => ConstructExport(x)));        
        return obj;
    }
}
