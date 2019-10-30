using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Exceptions;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Admin
{
    public interface IPermissionRepository
    {
        Task CheckAsync(int containerId, Permission requiredPermission);
        Task CheckAsync(List<int> containerIds, Permission requiredPermission);
        Task<PagedData<ContainerUserPermission>> GetPermissionsAsync(int containerId, Paging paging);
        Task<Permission> GetPermissionAsync(int containerId);
        Task UpdatePermissionAsync(ContainerUserPermission containerUserLink);
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

        public async Task CheckAsync(List<int> containerIds, Permission requiredPermission)
        {
            var tasks = containerIds.Select(x => CheckAsync(x, requiredPermission));
            await Task.WhenAll(tasks);
        }

        public async Task<PagedData<ContainerUserPermission>> GetPermissionsAsync(int containerId, Paging paging)
        {
            return await _dbContext.ContainerUserPermissions
                .AsNoTracking()
                .Include(x => x.User)
                .Where(x => x.ContainerId == containerId)
                .ApplyPagingAsync(paging);
        }

        public async Task<Permission> GetPermissionAsync(int containerId)
        {
            var link = await _dbContext.ContainerUserPermissions
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
                    .SingleOrDefaultAsync();
                return (container != null && container.IsPublic) ? Permission.Read : Permission.None;
            }
        }

        public async Task UpdatePermissionAsync(ContainerUserPermission containerUserLink)
        {
            var currentPermission = await _dbContext.ContainerUserPermissions
                .Where(x => x.UserId == containerUserLink.UserId)
                .Where(x => x.ContainerId == containerUserLink.ContainerId)
                .SingleOrDefaultAsync();

            if (containerUserLink.Permission == Permission.None)
            {
                if (currentPermission != null)
                {
                    _dbContext.ContainerUserPermissions.Remove(currentPermission);
                    await _dbContext.SaveChangesAsync();
                }
                return;
            }
            
            if (currentPermission != null)
            {
                currentPermission.Permission = containerUserLink.Permission;
                _dbContext.ContainerUserPermissions.Update(currentPermission);
                await _dbContext.SaveChangesAsync();
                return;
            }

            await _dbContext.ContainerUserPermissions.AddAsync(containerUserLink);
            await _dbContext.SaveChangesAsync();
        }
    }
}
