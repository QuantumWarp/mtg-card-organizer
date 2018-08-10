using System.Threading.Tasks;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Responses;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface ICardRepository
    {
        Task<PagedData<CardSet>> GetCardsAsync(CardQuery query);
    }

    public class CardRepository : ICardRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public CardRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData<CardSet>> GetCardsAsync(CardQuery query)
        {
            return await _dbContext.CardSets
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }
    }
}
