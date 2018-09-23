using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Admin
{
    [Authorize(Roles = Roles.Administrator)]
    [Route("api/users")]
    public class IdentityUserController : Controller
    {
        private IUserRepository _userRepository;

        public IdentityUserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<ActionResult<PagedData<User>>> GetMany([Base64Binder] Paging paging)
        {
            return await _userRepository.GetMany(paging);
        }
    }
}
