using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Bll.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {
        private readonly IIdentityService _identityService;

        public AuthenticationController(IIdentityService identityService)
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
