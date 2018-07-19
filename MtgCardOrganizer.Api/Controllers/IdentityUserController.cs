using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Identity.Managers;
using MtgCardOrganizer.Identity.Requests;
using MtgCoreLib;
using MtgCoreLib.Dtos.Admin;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;
using MtgCoreLib.Utilities.Parsers;

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
