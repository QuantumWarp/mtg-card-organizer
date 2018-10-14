using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Main
{
    public interface ICollectionRepository
    {        
        Task<Collection> GetAsync(int collectionId);
        Task CreateAsync(Collection collection);
        Task DeleteAsync(int collectionId);

        Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardInstanceQuery query);
        Task AddCardsAsync(int collectionId, List<CardInstance> cardInstances);
        Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds);

        Task<PagedData<Collection>> GetBookmarksAsync(Paging paging);
        Task<bool> IsBookmarkedAsync(int collectionId);
        Task ToggleBookmarkAsync(int collectionId);
    }

    internal class CollectionRepository : ICollectionRepository
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserService _user;

        public CollectionRepository(
            IPermissionRepository permissionRepository,
            IUserService user,
            MtgCardOrganizerContext dbContext)
        {
            _permissionRepository = permissionRepository;
            _user = user;
            _dbContext = dbContext;
        }

        public async Task<Collection> GetAsync(int id)
        {
            var collection = await _dbContext.Collections.FindAsync(id);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Read);
            return collection;
        }

        public async Task CreateAsync(Collection collection)
        {
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Admin);
            await _dbContext.Collections.AddAsync(collection);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int collectionId)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Read);
            _dbContext.Collections.Remove(collection);
            await _dbContext.SaveChangesAsync();
        }

        // Card Management
        public async Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardInstanceQuery query)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Read);

            return await _dbContext.CardInstances
                .AsNoTracking()
                .Where(x => x.CollectionId == collectionId)
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }

        public async Task AddCardsAsync(int collectionId, List<CardInstance> cardInstances)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Write);

            cardInstances.ForEach(x => x.CollectionId = collectionId);
            await _dbContext.CardInstances.AddRangeAsync(cardInstances);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Write);

            var cardInstances = await _dbContext.CardInstances.Where(x => cardInstanceIds.Contains(x.Id)).ToListAsync();
            _dbContext.CardInstances.RemoveRange(cardInstances);
            await _dbContext.SaveChangesAsync();
        }

        // Bookmarks
        public async Task<PagedData<Collection>> GetBookmarksAsync(Paging paging)
        {
            return await _dbContext.CollectionUserBookmarks
                .AsNoTracking()
                .Where(x => x.User.Id == _user.Id)
                .Select(x => x.Collection)
                .ApplyPagingAsync(paging);
        }

        public async Task<bool> IsBookmarkedAsync(int collectionId)
        {
            var currentBookmarkEntry = await _dbContext.CollectionUserBookmarks.FindAsync(_user.Id, collectionId);
            return currentBookmarkEntry != null;
        }

        public async Task ToggleBookmarkAsync(int collectionId)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Read);

            var currentBookmarkEntry = await _dbContext.CollectionUserBookmarks.FindAsync(_user.Id, collectionId);

            if (currentBookmarkEntry != null)
            {
                _dbContext.Remove(currentBookmarkEntry);
            }
            else
            {
                await _dbContext.CollectionUserBookmarks.AddAsync(new CollectionUserBookmark()
                {
                    UserId = _user.Id,
                    CollectionId = collectionId,
                });
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
