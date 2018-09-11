﻿using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Responses;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface ICardSetRepository
    {
        Task<PagedData<CardSet>> GetCardSetsAsync(CardQuery query);
    }

    public class CardSetRepository : ICardSetRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public CardSetRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData<CardSet>> GetCardSetsAsync(CardQuery query)
        {
            var test = await _dbContext.CardSets.Include(x => x.Card).FirstAsync();
            return await _dbContext.CardSets
                .Include(x => x.Card)
                .ApplyQuery(query)
                .ApplyPagingAsync(query?.Paging);
        }
    }
}
