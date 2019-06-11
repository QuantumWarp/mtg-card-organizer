using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
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

            return await _dbContext.CardInstances
                .AsNoTracking()
                .ApplyQuery(cardQuery)
                .GroupBy(x => x.CardSet.CardId)
                .Select(x => new CardInstanceGroupedCard {
                  Card = x.First().CardSet.Card,
                  Count = x.Count(),
                  FoilCount = x.Count(y => y.Foil),
                })
                .ApplyPagingAsync(cardQuery?.Paging);
        }

        public async Task<PagedData<CardInstanceGroupedCardSet>> GetGroupedByCardSetAsync(CardInstanceQuery cardQuery)
        {
            await CheckQueryPermissions(cardQuery);

            return await _dbContext.CardInstances
                .AsNoTracking()
                .ApplyQuery(cardQuery)
                .GroupBy(x => x.CardSetId)
                .Select(x => new CardInstanceGroupedCardSet {
                  CardSet = x.First().CardSet,
                  Count = x.Count(),
                  FoilCount = x.Count(y => y.Foil),
                })
                .ApplyPagingAsync(cardQuery?.Paging);
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
