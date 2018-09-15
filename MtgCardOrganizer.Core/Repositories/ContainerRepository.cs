using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Containers;
using MtgCardOrganizer.Core.Enums;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;
using MtgCardOrganizer.Core.Utilities.General;
using MtgCardOrganizer.Core.Utilities.ImportExport;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface IContainerRepository
    {
        Task<bool> UserHasPermission(Permission permission, int containerId);

        Task<Container> GetAsync(int? containerId);
        Task<PagedData<Container>> GetManyAsync(QueryModel<Container> queryModel);
        Task<Container> CreateAsync(Container container);
        Task DeleteAsync(int containerId);
    }

    public class ContainerRepository : IContainerRepository
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly UserService _user;

        public ContainerRepository(UserService user, MtgCardOrganizerContext dbContext)
        {
            _user = user;
            _dbContext = dbContext;
        }

        public async Task<bool> UserHasPermission(Permission permission, int containerId) {
            var validPermissions = PermissionExtensions.ValidPermissions(permission);
            var containerUserLink = await _dbContext.ContainerUserLinks
                .AsNoTracking()
                .Where(x => containerId == x.ContainerId)
                .Where(x => validPermissions.Contains(x.Permission))
                .SingleOrDefaultAsync();
            return containerUserLink != null;
        }

        public async Task<Container> GetAsync(int? containerId)
        {
            var baseQueryable = _dbContext.Containers
                .AsNoTracking()
                .Include(x => x.SubContainers)
                .Include(x => x.Collections)
                .Include(x => x.Decks);

            Container result;
            if (containerId != null)
            {
                result = await baseQueryable.SingleAsync(x => x.Id == containerId);
            }
            else
            {
                result = await baseQueryable.SingleOrDefaultAsync(x => 
                    x.ParentId == null && x.OwnerUserId == _user.Id);   

                if (result == null) {
                    result = await CreateAsync(new Container() {
                        Name = "Base Container"
                    });
                }
            }
            
            return result;
        }

        public async Task<PagedData<Container>> GetManyAsync(QueryModel<Container> queryModel)
        {
            return await _dbContext.Containers
                .AsNoTracking()
                .Include(x => x.SubContainers)
                .Include(x => x.Collections)
                .Include(x => x.Decks)
                .Where(x => x.OwnerUserId == _user.Id)
                .ApplyQueryModelAsync(queryModel);
        }

        public async Task<Container> CreateAsync(Container container)
        {
            container.OwnerUserId = _user.Id;
            await _dbContext.Containers.AddAsync(container);
            await _dbContext.SaveChangesAsync();
            return container;
        }

        public async Task DeleteAsync(int containerId)
        {
            var container = await _dbContext.Containers.FindAsync(containerId);
            _dbContext.Containers.Remove(container);
            await _dbContext.SaveChangesAsync();
        }
    }
}
