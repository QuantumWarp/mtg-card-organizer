using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Initialization;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface ISetRepository
    {
        Task<List<Set>> GetSetsAsync();
    }

    public class SetRepository : ISetRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public SetRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Set>> GetSetsAsync()
        {
            return await _dbContext.Sets
                .AsNoTracking()
                .OrderBy(x => x.Name)
                .ToListAsync();
        }
    }
}
