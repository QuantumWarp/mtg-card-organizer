using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MtgCardOrganizer.Bll.Initialization;
using MtgCardOrganizer.Bll.Requests;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Bll.Services
{
    public interface IIdentityService
    {
        Task<bool> RegisterAsync(RegisterRequest registerCommand);
        Task<JwtSecurityToken> GenerateTokenAsync(LoginRequest loginCommand);
    }

    internal class IdentityService : IIdentityService
    {
        private UserManager<IdentityUser> _userManager;
        private SignInManager<IdentityUser> _signInManager;

        public IdentityService(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        
        public async Task<bool> RegisterAsync(RegisterRequest registerRequest)
        {
            var user = new IdentityUser { UserName = registerRequest.Username, Email = registerRequest.Email };
            var result = await _userManager.CreateAsync(user, registerRequest.Password);
            return result.Succeeded;
        }
        
        public async Task<JwtSecurityToken> GenerateTokenAsync(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Username);
            if (user == null) 
                throw new Exception("Email not found");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
            if (!result.Succeeded)
                throw new Exception("Sign in failed");

            var claims = new List<Claim>();
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            
            var credentials = new SigningCredentials(BllInitializer.IdentityKey, SecurityAlgorithms.HmacSha256);
            var expiryTime = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken("Test", "Test", claims,
                expires: expiryTime,
                signingCredentials: credentials);

            return token;
        }
    }
}
