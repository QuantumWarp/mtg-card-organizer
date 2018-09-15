using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories
{
    public interface IContainerRepository
    {
        Task<Container> GetAsync(int containerId);
        Task CreateAsync(Container container, string providedUserId = null);
        Task DeleteAsync(int containerId);
    }

    internal class ContainerRepository : IContainerRepository
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserService _user;
        private readonly IPermissionRepository _permissionRepository;

        public ContainerRepository(
            MtgCardOrganizerContext dbContext,
            IUserService user,
            IPermissionRepository permissionRepository)
        {
            _dbContext = dbContext;
            _user = user;
            _permissionRepository = permissionRepository;
        }

        public async Task<Container> GetAsync(int containerId)
        {
            await _permissionRepository.CheckAsync(containerId, Permission.Read);

            return await _dbContext.Containers
                .AsNoTracking()
                .Include(x => x.SubContainers)
                .Include(x => x.Collections)
                .Include(x => x.Decks)
                .SingleAsync(x => x.Id == containerId);
        }

        public async Task CreateAsync(Container container, string providedUserId = null)
        {
            providedUserId = providedUserId ?? _user.Id;

            if (container.ParentId.HasValue)
            {
                await _permissionRepository.CheckAsync(container.ParentId.Value, Permission.Admin);
            }

            await _dbContext.Containers.AddAsync(container);
            await _permissionRepository.UpdatePermissionAsync(container.Id, providedUserId, Permission.Admin);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int containerId)
        {
            await _permissionRepository.CheckAsync(containerId, Permission.Admin);

            var container = await _dbContext.Containers.FindAsync(containerId);
            _dbContext.Containers.Remove(container);
            await _dbContext.SaveChangesAsync();
        }
    }
}
