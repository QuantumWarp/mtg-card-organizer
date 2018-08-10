using System.Threading.Tasks;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface ISetRepository
    {
        Task<PagedData<Set>> GetSetsAsync(QueryModel<Set> queryModel);
    }

    public class SetRepository : ISetRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public SetRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedData<Set>> GetSetsAsync(QueryModel<Set> queryModel)
        {
            var defaultSort = new PropertySort<Set>(nameof(Set.Name));
            return await _dbContext.Sets.ApplyQueryModelAsync(queryModel, defaultSort);
        }
    }
}
