using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Admin
{
    public interface IUserRepository
    {
        Task<PagedData<User>> GetMany(UserQuery userQuery);
        Task<bool> CheckUserUnique(User user);
        Task ToggleSuspension(string userId);
        Task RemoveUser(string userId);
    }

    internal class UserRepository : IUserRepository
    {
        private readonly MtgCardOrganizerContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(
            MtgCardOrganizerContext context,
            UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<PagedData<User>> GetMany(UserQuery userQuery)
        {
            return await _userManager.Users
                .ConditionalWhere(x => x.UserName.ToLower().Contains(userQuery.UserName), userQuery.UserName != null)
                .ApplyPagingAsync(userQuery.Paging);
        }

        public async Task<bool> CheckUserUnique(User user)
        {
            var userAlreadyExists = await _userManager.Users.AnyAsync(x =>
                x.UserName == user.UserName || x.UserName == user.Email ||
                (!string.IsNullOrEmpty(x.Email) && (x.Email == user.Email || x.Email == user.UserName)));
            return !userAlreadyExists;
        }

        public async Task ToggleSuspension(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            user.Suspended = !user.Suspended;
            await _userManager.UpdateAsync(user);
        }

        public async Task RemoveUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.DeleteAsync(user);
        }
    }
}
