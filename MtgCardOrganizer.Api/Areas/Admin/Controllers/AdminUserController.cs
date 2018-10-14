using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Admin.Dtos;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Admin.Controllers
{
    [Authorize(Roles = Roles.Administrator)]
    [Route("api/admin/users")]
    public class AdminUserController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;
        private readonly IUserRepository _userRepository;

        public AdminUserController(
            IMapper mapper,
            IIdentityService identityService,
            IUserRepository userRepository)
        {
            _mapper = mapper;
            _identityService = identityService;
            _userRepository = userRepository;
        }
        
        public async Task<ActionResult<PagedData<AdminUserDto>>> GetMany([Base64Binder] Paging paging)
        {
            var userQuery = new UserQuery() { Paging = paging };
            var users = await _userRepository.GetMany(userQuery);
            return _mapper.Map<PagedData<AdminUserDto>>(users);
        }

        [HttpPost("{userId}/toggle-suspension")]
        public async Task<IActionResult> ToggleSuspension(string userId)
        {
            await _identityService.ToggleSuspension(userId);
            return NoContent();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            await _userRepository.RemoveUser(userId);
            return NoContent();
        }
    }
}
