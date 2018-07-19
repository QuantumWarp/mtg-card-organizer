using System;
using System.IdentityModel.Tokens.Jwt;
using MtgCardOrganizer.Identity.Managers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace MtgCardOrganizer.Identity.Initialization
{
    public class IdentityInitializer
    {
        private IServiceCollection _services;
        private IConfigurationRoot _configuration;

        public IdentityInitializer(IServiceCollection services, IConfigurationRoot configuration)
        {
            _services = services;
            _configuration = configuration;
        }

        public void AddServices() 
        {
            this.AddRepositories(_services, _configuration);
            this.AddContexts(_services, _configuration);
            this.AddOtherServices(_services, _configuration);
        }

        public void AddRepositories(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddTransient<IIdentityUserRepository, IdentityUserRepository>();
        }

        public void AddContexts(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<IdentityContext>(options => 
                options.UseSqlite(configuration["ConnectionString"]));
        }
        
        public void AddOtherServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddIdentity<IdentityUser, IdentityRole>(options => {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 5;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<IdentityContext>()
                .AddDefaultTokenProviders();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthentication(options => {
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
                        IssuerSigningKey = Configuration.SymmetricSecurityKey,
                        ClockSkew = TimeSpan.FromMinutes(5),
                    };
                });
        }
    }
}
