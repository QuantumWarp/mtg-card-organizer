using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Enums;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;
using MtgCardOrganizer.Core.Utilities.General;
using MtgCardOrganizer.Core.Utilities.ImportExport;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface ICollectionRepository
    {
        bool UserHasPermission(Permission permission, params int[] collectionIds);

        Task<Collection> GetCollectionAsync(int id);
        Task<PagedData<Collection>> GetCollectionsAsync(QueryModel<Collection> queryModel);
        Task<bool> CreateCollectionAsync(Collection collection);
        Task<bool> DeleteCollectionAsync(int collectionId);


        Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardQuery query);
        bool AddCardsAsync(int collectionId, List<CardInstance> cardInstances);
        bool DeleteCardsAsync(int collectionId, List<int> cardInstanceIds);

        Task<string> ExportAsync(int collectionId);
        bool Import(int? collectionId, string importString);
    }

    public class CollectionRepository : ICollectionRepository
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly UserService _user;

        public CollectionRepository(UserService user, MtgCardOrganizerContext dbContext)
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

        public async Task<Collection> GetCollectionAsync(int id)
        {
            return await _dbContext.Collections.FindAsync(id);
        }

        public async Task<PagedData<Collection>> GetCollectionsAsync(QueryModel<Collection> queryModel)
        {
            return await _dbContext.Collections
                .Where(x => x.OwnerUserId == _user.Id)
                .ApplyQueryModelAsync(queryModel);
        }

        public async Task<bool> CreateCollectionAsync(Collection collection)
        {
            collection.OwnerUserId = _user.Id;
            await _dbContext.Collections.AddAsync(collection);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCollectionAsync(int collectionId)
        {
            var collection = _dbContext.Collections.SingleOrDefault(x => x.Id == collectionId);
            if (collection == null) return false;
            _dbContext.Collections.Remove(collection);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardQuery query)
        {
            var defaultSort = new PropertySort<CardInstance>(nameof(Card.Name));
            return await _dbContext.CardInstances
                .Where(x => x.CollectionCardLink.CollectionId == collectionId)
                .ApplyQuery(query, x => x.CardSet)
                .ApplyPagingAsync(query?.Paging);
        }

        public bool AddCardsAsync(int collectionId, List<CardInstance> cardInstances)
        {
            using(var transaction = _dbContext.Database.BeginTransaction()) {
                _dbContext.CardInstances.AddRange(cardInstances);
                _dbContext.SaveChanges();
                var cardLinks = cardInstances.Select(x => new CollectionCardLink() {
                    CollectionId = collectionId,
                    CardInstanceId = x.Id,
                });
                _dbContext.CollectionCardLinks.AddRange(cardLinks);
                _dbContext.SaveChanges();
                transaction.Commit();
                return true;
            }
        }
        
        public bool DeleteCardsAsync(int collectionId, List<int> cardCollectionLinkIds)
        {
            var cardLinks = _dbContext.CollectionCardLinks.Where(x => cardCollectionLinkIds.Contains(x.Id));
            _dbContext.CollectionCardLinks.RemoveRange(cardLinks);
            _dbContext.SaveChanges();
            return true;
        }

        public async Task<string> ExportAsync(int collectionId) {
            return await new Exporter(this, new SetRepository(_dbContext)).ConstructExport(collectionId);
        }

        public bool Import(int? collectionId, string importString) {
            // Get the collection
            new Importer(_dbContext).ProcessImport(importString, null, _user.Id);
            return true;
        }
    }
}
