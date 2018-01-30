using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Collections;
using MtgCoreLib.Initialization;
using MtgCoreLib.Managers;
using Newtonsoft.Json.Linq;

public class Importer {
    private MtgCoreLibContext _dbContext;
    private List<SetDto> _setDtos;
    
    public Importer(MtgCoreLibContext dbContext) {
        _dbContext = dbContext;
    }

    public void ProcessInport(string serializedExport, int? parentId) {
        using (var transaction = _dbContext.Database.BeginTransaction()) {
           _setDtos = _dbContext.Sets.ProjectTo<SetDto>().ToList();
            var jObject = JObject.Parse(serializedExport);
            ProcessCollection(jObject, parentId);
            _dbContext.SaveChanges();
            transaction.Commit();
        }
    }

    private void ProcessCollection(JObject collection, int? parentId) {

        collection.TryGetValue("name", out JToken name);
        var collectionEntity = new Collection(new CollectionDto() {
            Name = name.ToString(),
            ParentId = parentId
        });

        _dbContext.Collections.Add(collectionEntity);
        _dbContext.SaveChanges();

        collection.TryGetValue("cards", out JToken cards);
        foreach (var card in cards) {
            ProcessCard((JObject)card, collectionEntity.Id);
        }

        collection.TryGetValue("subCollections", out JToken subCollections);
        foreach (var subCollection in subCollections) {
            ProcessCollection((JObject)subCollection, collectionEntity.Id);
        }
    }

    private void ProcessCard(JObject card, int collectionId) {
        card.TryGetValue("name", out JToken name);
        card.TryGetValue("setName", out JToken setName);
        card.TryGetValue("num", out JToken num);

        var cardSetInfoQueryable = _dbContext.CardSetInfos.ProjectTo<CardDetailsDto>(Mapper.Configuration);

        if (!string.IsNullOrEmpty(num.ToString())) {
            cardSetInfoQueryable = cardSetInfoQueryable.Where(x => x.Num == num.ToString());
        }

        var cardSetInfo = cardSetInfoQueryable.Where(x => x.Name == name.ToString())
            .Where(x => x.SetId == _setDtos.First(set => set.Name == setName.ToString()).Id)
            .Single();

        _dbContext.CollectionCardLinks.Add(new CollectionCardLink(collectionId, cardSetInfo.CardSetInfoId));
    }
}
