using System;
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

        var possibleSetIds = _setDtos.Where(set => set.Name.ToLower() == card.SetName.ToLower()).Select(x => x.Id);

        cardSetInfoQueryable = cardSetInfoQueryable.Where(x => x.Name.ToLower() == card.Name.ToLower())
            .Where(x => possibleSetIds.Contains(x.SetId));

        CardDetailsDto cardSetInfo;
        if (!string.IsNullOrEmpty(card.Num)) {
            cardSetInfo = cardSetInfoQueryable.Where(x => x.Num == card.Num).FirstOrDefault();
            if (cardSetInfo == null) {
                cardSetInfo = cardSetInfoQueryable.Where(x => x.Num == card.Num + "a").FirstOrDefault();
            }
        } else {
            cardSetInfo = cardSetInfoQueryable.SingleOrDefault();
        }

        if (cardSetInfo == null) {
            cardSetInfo = cardSetInfoQueryable.FirstOrDefault();
        }

        var cardOtherInfo = new CardOtherInfo(new CardOtherInfoDto() {
            Foil = card.Foil,
            Promo = card.Promo
        });

        _dbContext.CardOtherInfos.Add(cardOtherInfo);
        _dbContext.SaveChanges();

        _dbContext.CollectionCardLinks.Add(new CollectionCardLink(collectionId, cardSetInfo.CardSetInfoId, cardOtherInfo.Id));
    }
}
