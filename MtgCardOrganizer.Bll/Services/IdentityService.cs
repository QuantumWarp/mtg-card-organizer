using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MtgCardOrganizer.Bll.Initialization;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Utilities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Bll.Services
{
    public interface IIdentityService
    {
        Task RegisterAsync(RegisterRequest registerCommand);
        Task<JwtSecurityToken> GenerateTokenAsync(LoginRequest loginCommand);
    }

    internal class IdentityService : IIdentityService
    {
        private readonly MtgCardOrganizerContext _dbContext;

        private readonly IContainerRepository _containerRepository;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public IdentityService(
            MtgCardOrganizerContext dbContext,
            IContainerRepository containerRepository,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _dbContext = dbContext;
            _containerRepository = containerRepository;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        
        public async Task RegisterAsync(RegisterRequest registerRequest)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                var container = new Container
                {
                    Name = "Base Container",
                    IsPublic = true,
                };

                var user = new User
                {
                    UserName = registerRequest.Username,
                    Email = registerRequest.Email,
                };

                var roles = new List<string> { Roles.StandardUser };
                if (!_userManager.Users.Any()) roles.Add(Roles.Administrator);

                await _userManager.CreateAsync(user, registerRequest.Password);
                await _containerRepository.CreateAsync(container, user.Id);
                user.BaseContainerId = container.Id;
                await _userManager.UpdateAsync(user);
                await _userManager.AddToRolesAsync(user, roles);

                transaction.Commit();
            }
        }
        
        public async Task<JwtSecurityToken> GenerateTokenAsync(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Username);
            if (user == null) 
                throw new Exception("Email not found");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
            if (!result.Succeeded)
                throw new Exception("Sign in failed");

            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>();
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim("baseContainerId", user.BaseContainerId.ToString()));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            
            var credentials = new SigningCredentials(BllInitializer.IdentityKey, SecurityAlgorithms.HmacSha256);
            var expiryTime = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken("Test", "Test", claims,
                expires: expiryTime,
                signingCredentials: credentials);

            return token;
        }
    }
}
