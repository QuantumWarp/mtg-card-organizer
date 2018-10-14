using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Common
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/users")]
    public class UserController : Controller
    {
        public IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ActionResult<PagedData<User>>> GetMany([Base64Binder] UserQuery userQuery)
        {
            return await _userRepository.GetMany(userQuery);
        }
    }
}
