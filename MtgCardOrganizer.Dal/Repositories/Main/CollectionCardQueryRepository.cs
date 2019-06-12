using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Main
{
    public interface ICollectionCardQueryRepository
    {
        Task<PagedData<CardInstanceGroupedCard>> GetGroupedByCardAsync(CardInstanceQuery cardQuery);
        Task<PagedData<CardInstanceGroupedCardSet>> GetGroupedByCardSetAsync(CardInstanceQuery cardQuery);
        Task<PagedData<CardInstance>> GetInstancesAsync(CardInstanceQuery query);
    }

    internal class CollectionCardQueryRepository : ICollectionCardQueryRepository
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserService _user;

        public CollectionCardQueryRepository(
            IPermissionRepository permissionRepository,
            IUserService user,
            MtgCardOrganizerContext dbContext)
        {
            _permissionRepository = permissionRepository;
            _user = user;
            _dbContext = dbContext;
        }

        public async Task<PagedData<CardInstanceGroupedCard>> GetGroupedByCardAsync(CardInstanceQuery cardQuery)
        {
            await CheckQueryPermissions(cardQuery);

            var groupedInstances = await _dbContext.CardInstances
                .AsNoTracking()
                .ApplyQuery(cardQuery)
                .GroupBy(x => x.CardSet.Card.Name)
                .Select(x => new {
                    CardName = x.Key,
                    Count = x.Count(),
                })
                .OrderBy(x => x.CardName)
                .ApplyPagingAsync(cardQuery?.Paging);

            return new PagedData<CardInstanceGroupedCard>(
                groupedInstances.Data
                    .GroupJoin(
                        _dbContext.Cards,
                        x => x.CardName,
                        x => x.Name,
                        (x, card) => new CardInstanceGroupedCard {
                            Card = card.First(),
                            Count = x.Count,
                        })
                    .ToList(),
                groupedInstances.TotalCount
            );
        }

        public async Task<PagedData<CardInstanceGroupedCardSet>> GetGroupedByCardSetAsync(CardInstanceQuery cardQuery)
        {
            await CheckQueryPermissions(cardQuery);

            var groupedInstances = await _dbContext.CardInstances
                .AsNoTracking()
                .ApplyQuery(cardQuery)
                .GroupBy(x => x.CardSetId)
                .Select(x => new {
                    CardSetId = x.Key,
                    Count = x.Count(),
                })
                .ApplyPagingAsync(cardQuery?.Paging);

            return new PagedData<CardInstanceGroupedCardSet>(
                groupedInstances.Data
                    .Join(
                        _dbContext.CardSets,
                        x => x.CardSetId,
                        x => x.Id,
                        (x, cardSet) => new CardInstanceGroupedCardSet {
                            CardSet = cardSet,
                            Count = x.Count,
                        })
                    .ToList(),
                groupedInstances.TotalCount
            );
        }

        public async Task<PagedData<CardInstance>> GetInstancesAsync(CardInstanceQuery cardQuery)
        {
            await CheckQueryPermissions(cardQuery);

            return await _dbContext.CardInstances
                .AsNoTracking()
                .ApplyQuery(cardQuery)
                .ApplyPagingAsync(cardQuery?.Paging);
        }

        private async Task CheckQueryPermissions(CardInstanceQuery cardQuery) {
            var collectionIds = cardQuery.CollectionIds;
            var containerIds = await _dbContext.Collections
              .Where(x => collectionIds.Contains(x.Id))
              .Select(x => x.ContainerId)
              .Distinct()
              .ToListAsync();
            await _permissionRepository.CheckAsync(containerIds, Permission.Read);
        }
    }
}
