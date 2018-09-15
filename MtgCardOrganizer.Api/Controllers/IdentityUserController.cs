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
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            await _identityService.RegisterAsync(registerRequest);
            return NoContent();
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> GenerateToken([FromBody] LoginRequest loginRequest)
        {
            var token = await _identityService.GenerateTokenAsync(loginRequest);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
