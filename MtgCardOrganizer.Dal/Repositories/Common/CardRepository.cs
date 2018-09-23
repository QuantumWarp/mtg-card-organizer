using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Common
{
    public interface ICardRepository
    {
        Task<PagedData<Card>> GetCardsAsync(CardQuery query);
        Task CreateManyAsync(List<Card> cards);
    }

    internal class CardRepository : ICardRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public CardRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData<Card>> GetCardsAsync(CardQuery query)
        {
            return await _dbContext.Cards
                .AsNoTracking()
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }

        // Admin Only
        public async Task CreateManyAsync(List<Card> cards)
        {
            await _dbContext.Cards.AddRangeAsync(cards);
            await _dbContext.SaveChangesAsync();
        }
    }
}
