using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Collections;
using MtgCoreLib.Initialization;
using MtgCoreLib.Utilities.General;

namespace MtgCoreLib.Managers
{
    public interface ICollectionManager
    {
        bool UserHasPermission(Permission permission, params int[] collectionIds);

        PagedData<CollectionDto> GetCollections(QueryModel<CollectionDto> queryModel);
        bool CreateCollection(CollectionDto collectionDto);
        bool DeleteCollection(int collectionId);


        PagedData<CardInstanceDto> GetCards(int collectionId, QueryModel<CardInstanceDto> queryModel);
        bool AddCards(int collectionId, List<AddCollectionCardCommand> cardSetInfoOtherInfoDict);
        bool DeleteCards(int collectionId, List<int> cardCollectionLinkIds);

        string Export(int collectionId);
        bool Import(int? collectionId, string importString);
    }

    public class CollectionManager : ICollectionManager
    {
        private readonly MtgCoreLibContext _dbContext;
        private readonly UserService _user;

        public CollectionManager(UserService user, MtgCoreLibContext dbContext)
        {
            _user = user;
            _dbContext = dbContext;
        }

        public bool UserHasPermission(Permission permission, params int[] collectionIds) {
            var validPermissions = PermissionExtensions.ValidPermissions(permission);
            var collectionUserLinks = _dbContext.CollectionUserLinks
                .Where(x => collectionIds.Contains(x.CollectionId))
                .Where(x => validPermissions.Contains(x.Permission));
            return collectionIds.All(id => 
                collectionUserLinks.SingleOrDefault(x => x.CollectionId == id) != null);
        }

        public PagedData<CollectionDto> GetCollections(QueryModel<CollectionDto> queryModel)
        {
            var defaultSort = new PropertySort<CollectionDto>(nameof(CollectionDto.Name));
            return _dbContext.Collections
                .Where(x => x.OwnerUserId == _user.Id)
                .AsPagedData(queryModel, defaultSort);
        }

        public bool CreateCollection(CollectionDto collectionDto)
        {
            collectionDto.OwnerUserId = _user.Id;
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

        public PagedData<CardInstanceDto> GetCards(int collectionId, QueryModel<CardInstanceDto> queryModel)
        {
            var defaultSort = new PropertySort<CardInstanceDto>(nameof(CardInstanceDto.Name));
            return _dbContext.CollectionCardLinks
                .Where(ccl => ccl.CollectionId == collectionId)
                .AsPagedData(queryModel, defaultSort);
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
            new Importer(_dbContext).ProcessImport(importString, collectionId, _user.Id);
            return true;
        }
    }
}
