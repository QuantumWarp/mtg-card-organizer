using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Collections;
using MtgCoreLib.Initialization;
using MtgCoreLib.Managers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class Importer {
    private MtgCoreLibContext _dbContext;
    private List<SetDto> _setDtos;
    
    public Importer(MtgCoreLibContext dbContext) {
        _dbContext = dbContext;
    }

    public void ProcessImport(string serializedExport, int? parentId, string userId) {
        using (var transaction = _dbContext.Database.BeginTransaction()) {
           _setDtos = _dbContext.Sets.ProjectTo<SetDto>().ToList();
            var model = JsonConvert.DeserializeObject<CollectionExportModel>(serializedExport);
            ProcessCollection(model, parentId, userId);
            _dbContext.SaveChanges();
            transaction.Commit();
        }
    }

    private void ProcessCollection(CollectionExportModel collection, int? parentId, string userId) {
        var collectionEntity = new Collection(new CollectionDto() {
            Name = collection.Name,
            ParentId = parentId,
            OwnerUserId = userId,
        });

        _dbContext.Collections.Add(collectionEntity);
        _dbContext.SaveChanges();

        foreach (var card in collection.Cards) {
            ProcessCard(card, collectionEntity.Id);
        }

        foreach (var subCollection in collection.SubCollections) {
            ProcessCollection(subCollection, collectionEntity.Id, userId);
        }
    }

    private void ProcessCard(CardInstanceExportModel card, int collectionId) {
        var cardSetInfoQueryable = _dbContext.CardSetInfos.ProjectTo<CardDetailsDto>(Mapper.Configuration);

        if (!string.IsNullOrEmpty(card.Num)) {
            cardSetInfoQueryable = cardSetInfoQueryable.Where(x => x.Num == card.Num);
        }

        var cardSetInfoId = cardSetInfoQueryable.Where(x => x.Name == card.Name)
            .Where(x => x.SetId == _setDtos.First(set => set.Name == card.SetName).Id)
            .Single().CardSetInfoId;

        var cardOtherInfo = new CardOtherInfo(new CardOtherInfoDto() {
            Foil = card.Foil,
            Promo = card.Promo
        });

        _dbContext.CardOtherInfos.Add(cardOtherInfo);
        _dbContext.SaveChanges();

        _dbContext.CollectionCardLinks.Add(new CollectionCardLink(collectionId, cardSetInfoId, cardOtherInfo.Id));
    }
}
