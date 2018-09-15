using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Initialization;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace MtgCardOrganizer.Bll.Initialization
{
    public class BllInitializer
    {
        internal static readonly SymmetricSecurityKey IdentityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("86759592-46f3-441b-ad0e-e4670e04a2b3"));

        private IServiceCollection _services;
        private IConfigurationRoot _configuration;

        public BllInitializer(IServiceCollection services, IConfigurationRoot configuration)
        {
            _services = services;
            _configuration = configuration;
        }

        public void AddServices() 
        {
            _services.AddTransient<IIdentityService, IdentityService>();


            _services.AddIdentity<IdentityUser, IdentityRole>(options => {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 5;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<MtgCardOrganizerContext>()
                .AddDefaultTokenProviders();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            _services.AddAuthentication(options => {
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg => {
                    cfg.RequireHttpsMetadata = false; // Dev only
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = false,
                        RequireExpirationTime = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = IdentityKey,
                        ClockSkew = TimeSpan.FromMinutes(5),
                    };
                });
        }
    }
}
