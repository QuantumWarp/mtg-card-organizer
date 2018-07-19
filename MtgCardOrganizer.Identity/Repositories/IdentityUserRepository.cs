using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MtgCardOrganizer.Identity.Initialization;
using MtgCardOrganizer.Identity.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace MtgCardOrganizer.Identity.Managers
{
    public interface IIdentityUserRepository
    {
        Task<bool> RegisterAsync(RegisterCommand registerCommand);
        Task<JwtSecurityToken> GenerateTokenAsync(LoginCommand loginCommand);
    }

    public class IdentityUserRepository : IIdentityUserRepository
    {
        private UserManager<IdentityUser> _userManager;
        private SignInManager<IdentityUser> _signInManager;

        public IdentityUserRepository(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        
        public async Task<bool> RegisterAsync(RegisterCommand registerCommand)
        {
            var user = new IdentityUser { UserName = registerCommand.Username, Email = registerCommand.Email };
            var result = await _userManager.CreateAsync(user, registerCommand.Password);
            return result.Succeeded;
        }
        
        public async Task<JwtSecurityToken> GenerateTokenAsync(LoginCommand loginCommand)
        {
            var user = await _userManager.FindByNameAsync(loginCommand.Username);
            if (user == null) 
                throw new Exception("Email not found");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginCommand.Password, false);
            if (!result.Succeeded)
                throw new Exception("Sign in failed");

            var claims = new List<Claim>();
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            
            var credentials = new SigningCredentials(Configuration.SymmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var expiryTime = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken("Test", "Test", claims,
                expires: expiryTime,
                signingCredentials: credentials);

            return token;
        }
    }
}
