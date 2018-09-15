using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities.General;
using MtgCardOrganizer.Dal.Utilities.ImportExport;

namespace MtgCardOrganizer.Dal.Repositories
{
    public interface ICollectionRepository
    {        
        Task<PagedData<Collection>> GetManyAsync(Paging paging);
        Task<Collection> GetAsync(int collectionId);
        Task<Collection> CreateAsync(Collection collection);
        Task DeleteAsync(int collectionId);


        Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardInstanceQuery query);
        Task<List<CardInstance>> AddCardsAsync(int collectionId, List<CardInstance> cardInstances);
        Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds);
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

        public async Task<PagedData<Collection>> GetManyAsync(Paging paging)
        {
            return await _dbContext.Collections
                .AsNoTracking()
                .ApplyPagingAsync(paging);
        }

        public async Task<Collection> GetAsync(int id)
        {
            return await _dbContext.Collections.FindAsync(id);
        }

        public async Task<Collection> CreateAsync(Collection collection)
        {
            await _dbContext.Collections.AddAsync(collection);
            await _dbContext.SaveChangesAsync();
            return collection;
        }

        public async Task DeleteAsync(int collectionId)
        {
            var collection = await _dbContext.Collections.FindAsync(collectionId);
            _dbContext.Collections.Remove(collection);
            await _dbContext.SaveChangesAsync();
        }

        // Card Management

        public async Task<PagedData<CardInstance>> GetCardsAsync(int collectionId, CardInstanceQuery query)
        {
            return await _dbContext.CardInstances
                .AsNoTracking()
                .Where(x => x.CollectionId == collectionId)
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }

        public async Task<List<CardInstance>> AddCardsAsync(int collectionId, List<CardInstance> cardInstances)
        {
            cardInstances.ForEach(x => x.CollectionId = collectionId);
            await _dbContext.CardInstances.AddRangeAsync(cardInstances);
            await _dbContext.SaveChangesAsync();
            return cardInstances;
        }
        
        public async Task DeleteCardsAsync(int collectionId, List<int> cardInstanceIds)
        {
            var cardInstances = await _dbContext.CardInstances.Where(x => cardInstanceIds.Contains(x.Id)).ToListAsync();
            _dbContext.CardInstances.RemoveRange(cardInstances);
            await _dbContext.SaveChangesAsync();
        }
    }
}
