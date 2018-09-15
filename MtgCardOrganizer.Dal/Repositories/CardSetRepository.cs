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
    public interface ICardSetRepository
    {
        Task<PagedData<CardSet>> GetCardSetsAsync(CardSetQuery query);
    }

    public class CardSetRepository : ICardSetRepository
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
    }
}
