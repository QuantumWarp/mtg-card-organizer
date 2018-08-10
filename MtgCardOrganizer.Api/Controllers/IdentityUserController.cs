using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Identity.Managers;
using MtgCardOrganizer.Identity.Requests;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/auth")]
    public class IdentityUserController : Controller
    {
        private IIdentityUserRepository _identityUserRepository;

        public IdentityUserController(IIdentityUserRepository identityUserRepository)
        {
            _identityUserRepository = identityUserRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<bool>> Register([FromBody] RegisterCommand registerCommand)
        {
            return await _identityUserRepository.RegisterAsync(registerCommand);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> GenerateToken([FromBody] LoginCommand loginCommand)
        {
            var token = await _identityUserRepository.GenerateTokenAsync(loginCommand);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
