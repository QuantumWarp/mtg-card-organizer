using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MtgCardOrganizer.Bll.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Text;

[assembly: InternalsVisibleTo("MtgCardOrganizer.Seeding")]
[assembly: InternalsVisibleTo("MtgCardOrganizer.Tests")]
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
            _services.AddScoped<IAdminCardService, AdminCardService>();
            _services.AddScoped<IIdentityService, IdentityService>();
            _services.AddScoped<IImportExportService, ImportExportService>();

            AddAuth();
        }

        private void AddAuth()
        {
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
