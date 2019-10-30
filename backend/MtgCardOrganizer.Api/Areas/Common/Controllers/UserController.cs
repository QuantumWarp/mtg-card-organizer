using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Common.Controllers
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UserController(
            IMapper mapper,
            IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<ActionResult<PagedData<UserDto>>> GetMany([Base64Binder] UserQuery userQuery)
        {
            var users = await _userRepository.GetMany(userQuery);
            return _mapper.Map<PagedData<UserDto>>(users);
        }
    }
}
