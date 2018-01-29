using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
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


        PagedData<CardDetailsDto> GetCards(int collectionId, PageSortFilter pageSortFilter);
        bool AddCards(int collectionId, List<int> cardSetInfoIds);
        bool DeleteCards(int collectionId, List<int> cardSetInfoIds);

        string Export(int collectionId);
        bool Import(string importString);
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

        public PagedData<CardDetailsDto> GetCards(int collectionId, PageSortFilter pageSortFilter)
        {
            return new PagedData<CardDetailsDto>(
                _dbContext.CollectionCardLinks.Where(ccl => ccl.CollectionId == collectionId).Select(ccl => ccl.CardSetInfo).ProjectTo<CardDetailsDto>(Mapper.Configuration).ApplyPageSortFilter(pageSortFilter), 
                _dbContext.CollectionCardLinks.Where(ccl => ccl.CollectionId == collectionId).Count());
        }

        public bool AddCards(int collectionId, List<int> cardSetInfoIds)
        {
            var cardLinks = cardSetInfoIds.Select(cardSetInfoId => new CollectionCardLink(collectionId, cardSetInfoId));
            _dbContext.CollectionCardLinks.AddRange(cardLinks);
            _dbContext.SaveChanges();
            return true;
        }
        
        public bool DeleteCards(int collectionId, List<int> cardSetInfoIds)
        {
            var cardLinks = _dbContext.CollectionCardLinks.Where(x => x.CollectionId == collectionId);
            var cardLinksToDelete = new List<CollectionCardLink>();
            foreach (var cardLink in cardLinks) {
                if (cardSetInfoIds.Contains(cardLink.CardSetInfoId)) {
                    cardLinksToDelete.Add(cardLink);
                    cardSetInfoIds.Remove(cardLink.CardSetInfoId);
                }
            }
            _dbContext.CollectionCardLinks.RemoveRange(cardLinksToDelete);
            _dbContext.SaveChanges();
            return true;
        }

        public string Export(int collectionId) {
            return new Exporter(this, new SetManager(_dbContext)).ConstructExport(collectionId);
        }

        public bool Import(string importString) {
            return false;
        }
    }
}
