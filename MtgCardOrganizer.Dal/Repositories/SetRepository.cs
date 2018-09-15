using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Initialization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories
{
    public interface ISetRepository
    {
        Task<List<Set>> GetSetsAsync();
        Task CreateManyAsync(List<Set> sets);
    }

    internal class SetRepository : ISetRepository
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

        // Admin Only
        public async Task CreateManyAsync(List<Set> sets)
        {
            await _dbContext.Sets.AddRangeAsync(sets);
            await _dbContext.SaveChangesAsync();
        }
    }
}
