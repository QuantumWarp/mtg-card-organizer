using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities.General;

namespace MtgCardOrganizer.Dal.Repositories
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
            return await _dbContext.Cards
                .AsNoTracking()
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }
    }
}
