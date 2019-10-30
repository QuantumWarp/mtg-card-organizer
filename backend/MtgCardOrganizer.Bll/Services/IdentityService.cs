using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MtgCardOrganizer.Bll.Exceptions;
using MtgCardOrganizer.Bll.Initialization;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Admin;
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
        Task<JwtSecurityToken> RegisterAsync(RegisterRequest registerCommand);
        Task<JwtSecurityToken> LoginAsync(LoginRequest loginCommand);
        Task ToggleSuspension(string userId);
    }

    internal class IdentityService : IIdentityService
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IContainerRepository _containerRepository;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public IdentityService(
            IUserRepository userRepository,
            IContainerRepository containerRepository,
            MtgCardOrganizerContext dbContext,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _dbContext = dbContext;
            _userRepository = userRepository;
            _containerRepository = containerRepository;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        
        public async Task<JwtSecurityToken> RegisterAsync(RegisterRequest registerRequest)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                var container = new Container
                {
                    Name = registerRequest.Username + "'s Container",
                    IsPublic = true,
                };

                var user = new User
                {
                    UserName = registerRequest.Username,
                    Email = registerRequest.Email,
                };

                var userUnique = await _userRepository.CheckUserUnique(user);
                if (!userUnique) throw new RegistrationException("User or email already exists");

                var roles = new List<string> { Roles.StandardUser };
                if (!_userManager.Users.Any()) roles.Add(Roles.Administrator);

                await _userManager.CreateAsync(user, registerRequest.Password);
                await _containerRepository.CreateAsync(container, user.Id);
                user.BaseContainerId = container.Id;
                await _userManager.UpdateAsync(user);
                await _userManager.AddToRolesAsync(user, roles);

                transaction.Commit();
                
                return await GenerateTokenAsync(user);
            }
        }
        
        public async Task<JwtSecurityToken> LoginAsync(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.LoginName);
            if (user == null) await _userManager.FindByEmailAsync(loginRequest.LoginName);
            if (user == null) 
                throw new LoginException("Invalid login details");

            if (user.Suspended)
                throw new LoginException("Account currently suspended");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
            if (!result.Succeeded)
                throw new LoginException("Invalid login details");

            return await GenerateTokenAsync(user);
        }

        public async Task ToggleSuspension(string userId)
        {
            // TODO: Logout user
            await _userRepository.ToggleSuspension(userId);
        }

        private async Task<JwtSecurityToken> GenerateTokenAsync(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim("username", user.UserName),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("baseContainerId", user.BaseContainerId.ToString())
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            
            var credentials = new SigningCredentials(BllInitializer.IdentityKey, SecurityAlgorithms.HmacSha256);
            var expiryTime = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken("MtgCardOrganizer", "MtgCardOrganizer", claims,
                expires: expiryTime,
                signingCredentials: credentials);

            return token;
        }
    }
}
