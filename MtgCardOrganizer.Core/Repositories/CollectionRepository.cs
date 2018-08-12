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
        Task AddCardsAsync(int collectionId, List<CardInstance> cardInstances);
        Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds);

        Task<string> ExportAsync(int collectionId);
        Task Import(int? collectionId, string importString);
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
            return await _dbContext.CardInstances
                .Include(x => x.CardSet)
                    .Include(x => x.CardSet.Card)
                .Where(x => x.CollectionId == collectionId)
                .ApplyQuery(query, x => x.CardSet)
                .ApplyPagingAsync(query?.Paging);
        }

        public async Task AddCardsAsync(int collectionId, List<CardInstance> cardInstances)
        {
            await _dbContext.CardInstances.AddRangeAsync(cardInstances);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds)
        {
            var cardInstances = await _dbContext.CardInstances.FindAsync(cardInstanceIds);
            _dbContext.CardInstances.RemoveRange(cardInstances);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<string> ExportAsync(int collectionId) {
            return await new Exporter(this, new SetRepository(_dbContext)).ConstructExport(collectionId);
        }

        public async Task Import(int? collectionId, string importString) {
            await new Importer(_dbContext).ProcessImportAsync(importString, null, _user.Id);
        }
    }
}
