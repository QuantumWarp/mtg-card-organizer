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
