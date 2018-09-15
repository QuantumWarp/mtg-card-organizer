using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Bll.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/auth")]
    public class IdentityUserController : Controller
    {
        private IIdentityService _identityService;

        public IdentityUserController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<bool>> Register([FromBody] RegisterCommand registerCommand)
        {
            return await _identityService.RegisterAsync(registerCommand);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> GenerateToken([FromBody] LoginCommand loginCommand)
        {
            var token = await _identityService.GenerateTokenAsync(loginCommand);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
