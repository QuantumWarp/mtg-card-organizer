using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Exceptions;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Admin
{
    public interface IPermissionRepository
    {
        Task CheckAsync(int containerId, Permission requiredPermission);
        Task<PagedData<ContainerUserLink>> GetPermissionsAsync(int containerId, Paging paging);
        Task<Permission> GetPermissionAsync(int containerId);
        Task UpdatePermissionAsync(ContainerUserLink containerUserLink);
    }

    public class PermissionRepository : IPermissionRepository
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserService _user;

        public PermissionRepository(
            IUserService user,
            MtgCardOrganizerContext dbContext)
        {
            _user = user;
            _dbContext = dbContext;
        }

        public async Task CheckAsync(int containerId, Permission requiredPermission)
        {
            var userPermission = await GetPermissionAsync(containerId);
            var valid = requiredPermission <= userPermission;

            if (!valid)
                throw new PermissionException("Invalid permissions");
        }

        public async Task<PagedData<ContainerUserLink>> GetPermissionsAsync(int containerId, Paging paging)
        {
            return await _dbContext.ContainerUserLinks
                .AsNoTracking()
                .Include(x => x.User)
                .Where(x => x.ContainerId == containerId)
                .ApplyPagingAsync(paging);
        }

        public async Task<Permission> GetPermissionAsync(int containerId)
        {
            var link = await _dbContext.ContainerUserLinks
                .AsNoTracking()
                .Where(x => x.UserId == _user.Id)
                .Where(x => x.ContainerId == containerId)
                .SingleOrDefaultAsync();

            if (link != null)
            {
                return link.Permission;
            }
            else
            {
                var container = await _dbContext.Containers
                    .AsNoTracking()
                    .Where(x => x.Id == containerId)
                    .SingleAsync();
                return container.IsPublic ? Permission.Read : Permission.None;
            }
        }

        public async Task UpdatePermissionAsync(ContainerUserLink containerUserLink)
        {
            var currentPermission = await _dbContext.ContainerUserLinks
                .Where(x => x.UserId == containerUserLink.UserId)
                .Where(x => x.ContainerId == containerUserLink.ContainerId)
                .SingleOrDefaultAsync();

            if (containerUserLink.Permission == Permission.None)
            {
                if (currentPermission != null)
                {
                    _dbContext.ContainerUserLinks.Remove(currentPermission);
                    await _dbContext.SaveChangesAsync();
                }
                return;
            }
            
            if (currentPermission != null)
            {
                currentPermission.Permission = containerUserLink.Permission;
                _dbContext.ContainerUserLinks.Update(currentPermission);
                await _dbContext.SaveChangesAsync();
                return;
            }

            await _dbContext.ContainerUserLinks.AddAsync(containerUserLink);
            await _dbContext.SaveChangesAsync();
        }
    }
}
