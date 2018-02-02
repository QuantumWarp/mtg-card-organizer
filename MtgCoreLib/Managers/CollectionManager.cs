using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Collections;
using MtgCoreLib.Initialization;
using MtgCoreLib.Utilities.General;

namespace MtgCoreLib.Managers
{
    public interface ICollectionManager
    {
        PagedData<CollectionDto> GetCollections(PageSortFilter pageSortFilter);
        bool CreateCollection(CollectionDto collectionDto);
        bool DeleteCollection(int collectionId);


        PagedData<CardInstanceDto> GetCards(int collectionId, PageSortFilter pageSortFilter);
        bool AddCards(int collectionId, List<AddCollectionCardCommand> cardSetInfoOtherInfoDict);
        bool DeleteCards(int collectionId, List<int> cardCollectionLinkIds);

        string Export(int collectionId);
        bool Import(int? collectionId, string importString);
    }

    public class CollectionManager : ICollectionManager
    {
        private MtgCoreLibContext _dbContext;

        public CollectionManager(MtgCoreLibContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PagedData<CollectionDto> GetCollections(PageSortFilter pageSortFilter)
        {
            return new PagedData<CollectionDto>(
                _dbContext.Collections.ProjectTo<CollectionDto>(Mapper.Configuration).ApplyPageSortFilter(pageSortFilter), 
                _dbContext.Collections.Count());
        }

        public bool CreateCollection(CollectionDto collectionDto)
        {
            _dbContext.Collections.Add(new Collection(collectionDto));
            _dbContext.SaveChanges();
            return true;
        }

        public bool DeleteCollection(int collectionId)
        {
            var collection = _dbContext.Collections.SingleOrDefault(x => x.Id == collectionId);
            if (collection == null) return false;
            _dbContext.Collections.Remove(collection);
            _dbContext.SaveChanges();
            return true;
        }

        public PagedData<CardInstanceDto> GetCards(int collectionId, PageSortFilter pageSortFilter)
        {
            return new PagedData<CardInstanceDto>(
                _dbContext.CollectionCardLinks
                    .Where(ccl => ccl.CollectionId == collectionId)
                    .ProjectTo<CardInstanceDto>(Mapper.Configuration)
                    .ApplyPageSortFilter(pageSortFilter), 
                _dbContext.CollectionCardLinks.Where(ccl => ccl.CollectionId == collectionId).Count());
        }

        public bool AddCards(int collectionId, List<AddCollectionCardCommand> cardSetInfoOtherInfoDict)
        {
            using(var transaction = _dbContext.Database.BeginTransaction()) {
                var cardSetInfoOtherInfoIdsDict = new Dictionary<AddCollectionCardCommand, CardOtherInfo>(cardSetInfoOtherInfoDict.Select(command => 
                    KeyValuePair.Create(command, new CardOtherInfo(new CardOtherInfoDto() {
                        Foil = command.Foil,
                        Promo = command.Promo
                    }))));
                _dbContext.CardOtherInfos.AddRange(cardSetInfoOtherInfoIdsDict.Values);
                _dbContext.SaveChanges();
                var cardLinks = cardSetInfoOtherInfoIdsDict.Select(kvp => new CollectionCardLink(collectionId, kvp.Key.CardSetInfoId, kvp.Value.Id));
                _dbContext.CollectionCardLinks.AddRange(cardLinks);
                _dbContext.SaveChanges();
                transaction.Commit();
                return true;
            }
        }
        
        public bool DeleteCards(int collectionId, List<int> cardCollectionLinkIds)
        {
            var cardLinks = _dbContext.CollectionCardLinks.Where(x => cardCollectionLinkIds.Contains(x.Id));
            _dbContext.CollectionCardLinks.RemoveRange(cardLinks);
            _dbContext.SaveChanges();
            return true;
        }

        public string Export(int collectionId) {
            return new Exporter(this, new SetManager(_dbContext)).ConstructExport(collectionId);
        }

        public bool Import(int? collectionId, string importString) {
            new Importer(_dbContext).ProcessImport(importString, collectionId);
            return true;
        }
    }
}
