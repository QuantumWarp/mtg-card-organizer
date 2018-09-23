using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Common
{
    public interface ICardSetRepository
    {
        Task<PagedData<CardSet>> GetCardSetsAsync(CardSetQuery query);
        Task<List<CardSet>> GetCardSetsByNameAsync(List<string> names);
        Task CreateManyAsync(List<CardSet> cardSets);
    }

    internal class CardSetRepository : ICardSetRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public CardSetRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData<CardSet>> GetCardSetsAsync(CardSetQuery query)
        {
            return await _dbContext.CardSets
                .AsNoTracking()
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }

        // Importer
        public async Task<List<CardSet>> GetCardSetsByNameAsync(List<string> names)
        {
            return await _dbContext.CardSets
                .Include(x => x.Card)
                .Where(x => names.Contains(x.Card.Name))
                .ToListAsync();
        }

        // Admin Only
        public async Task CreateManyAsync(List<CardSet> cardSets)
        {
            await _dbContext.CardSets.AddRangeAsync(cardSets);
            await _dbContext.SaveChangesAsync();
        }
    }
}
