using Microsoft.AspNetCore.Identity;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Admin
{
    public interface IUserRepository
    {
        Task<PagedData<User>> GetMany(Paging paging);
    }

    internal class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<PagedData<User>> GetMany(Paging paging)
        {
            return await _userManager.Users
                .ApplyPagingAsync(paging);
        }
    }
}
