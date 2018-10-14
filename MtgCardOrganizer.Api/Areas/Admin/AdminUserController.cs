using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Admin
{
    [Authorize(Roles = Roles.Administrator)]
    [Route("api/admin/users")]
    public class AdminUserController : Controller
    {
        private readonly IIdentityService _identityService;
        private readonly IUserRepository _userRepository;

        public AdminUserController(
            IIdentityService identityService,
            IUserRepository userRepository)
        {
            _identityService = identityService;
            _userRepository = userRepository;
        }
        
        public async Task<ActionResult<PagedData<User>>> GetMany([Base64Binder] Paging paging)
        {
            var userQuery = new UserQuery() { Paging = paging };
            return await _userRepository.GetMany(userQuery);
        }

        [HttpPost("{userId}/toggle-suspension")]
        public async Task<IActionResult> ToggleSuspension(string userId)
        {
            await _identityService.ToggleSuspension(userId);
            return Ok();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            await _userRepository.RemoveUser(userId);
            return Ok();
        }
    }
}
