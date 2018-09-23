using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Utilities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Admin
{
    public interface IPermissionRepository
    {
        Task CheckAsync(int containerId, Permission permission);
        Task UpdatePermissionAsync(int containerId, string userId, Permission permission);
    }

    public class PermissionRepository : IPermissionRepository
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserService _user;

        public PermissionRepository(IUserService user, MtgCardOrganizerContext dbContext)
        {
            _user = user;
            _dbContext = dbContext;
        }

        public async Task CheckAsync(int containerId, Permission permission)
        {
            var valid = await _dbContext.ContainerUserLinks
                .AsNoTracking()
                .Where(x => x.UserId == _user.Id)
                .Where(x => x.ContainerId == containerId)
                .Where(x => x.Permission >= permission)
                .AnyAsync();

            if (!valid && permission <= Permission.Read)
            {
                var container = await _dbContext.Containers
                    .AsNoTracking()
                    .Where(x => x.Id == containerId)
                    .SingleAsync();
                valid = container.IsPublic;
            }

            if (!valid)
                throw new Exception("User does not have permission");
        }

        // Does not save changes
        public async Task UpdatePermissionAsync(int containerId, string userId, Permission permission)
        {
            var currentPermission = await _dbContext.ContainerUserLinks
                .Where(x => x.UserId == userId)
                .Where(x => x.ContainerId == containerId)
                .SingleOrDefaultAsync();

            if (permission == Permission.None)
            {
                if (currentPermission != null)
                {
                    _dbContext.Remove(currentPermission);
                }
                return;
            }
            
            if (currentPermission != null)
            {
                currentPermission.Permission = permission;
                _dbContext.Update(currentPermission);
                return;
            }
            
            var userLink = new ContainerUserLink
            {
                ContainerId = containerId,
                UserId = userId,
                Permission = permission,
            };

            await _dbContext.AddAsync(userLink);
            return;
        }
    }
}
