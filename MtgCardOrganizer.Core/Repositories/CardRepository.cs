using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Requests.CardQueries;
using MtgCardOrganizer.Core.Responses;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface ICardRepository
    {
        Task<PagedData<Card>> GetCardsAsync(CardQuery query);
    }

    public class CardRepository : ICardRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public CardRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData<Card>> GetCardsAsync(CardQuery query)
        {
            var test = await _dbContext.Cards.FirstAsync();
            return await _dbContext.Cards
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }
    }
}
