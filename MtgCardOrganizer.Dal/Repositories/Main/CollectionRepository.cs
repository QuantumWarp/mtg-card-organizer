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
        Task<PagedData<Collection>> GetManyAsync(Paging paging);
        Task<Collection> GetAsync(int collectionId);
        Task CreateAsync(Collection collection);
        Task DeleteAsync(int collectionId);


        Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardInstanceQuery query);
        Task<List<CardInstance>> AddCardsAsync(int collectionId, List<CardInstance> cardInstances);
        Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds);
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

        public async Task<PagedData<Collection>> GetManyAsync(Paging paging)
        {
            return await _dbContext.Collections
                .AsNoTracking()
                .Where(x => x.Container.ContainerUserLinks.Any(y => y.UserId == _user.Id && y.Permission > Permission.None))
                .ApplyPagingAsync(paging);
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

        public async Task<List<CardInstance>> AddCardsAsync(int collectionId, List<CardInstance> cardInstances)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Write);

            cardInstances.ForEach(x => x.CollectionId = collectionId);
            await _dbContext.CardInstances.AddRangeAsync(cardInstances);
            await _dbContext.SaveChangesAsync();
            return cardInstances;
        }
        
        public async Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            await _permissionRepository.CheckAsync(collection.ContainerId, Permission.Write);

            var cardInstances = await _dbContext.CardInstances.Where(x => cardInstanceIds.Contains(x.Id)).ToListAsync();
            _dbContext.CardInstances.RemoveRange(cardInstances);
            await _dbContext.SaveChangesAsync();
        }
    }
}