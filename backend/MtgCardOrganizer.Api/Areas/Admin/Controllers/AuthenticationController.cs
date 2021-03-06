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
        public async Task<ActionResult<string>> Register([FromBody] RegisterRequest registerRequest)
        {
            var token = await _identityService.RegisterAsync(registerRequest);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> GenerateToken([FromBody] LoginRequest loginRequest)
        {
            var token = await _identityService.LoginAsync(loginRequest);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
