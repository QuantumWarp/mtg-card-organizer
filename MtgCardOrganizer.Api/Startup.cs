using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MtgCardOrganizer.Api.Exceptions;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Bll.Initialization;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Utilities;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("MtgCardOrganizer.Seeding")]
[assembly: InternalsVisibleTo("MtgCardOrganizer.Tests")]
namespace MtgCardOrganizer.Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            Environment = env;
        }

        public IConfigurationRoot Configuration { get; }
        public IHostingEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(ctg => ctg.AddConsole());
            services.AddSingleton(_ => Configuration);

            // Add framework services.
            services.AddCors();
            services.AddMvc(config => {
                config.Filters.Add<GlobalExceptionFilter>();
		        config.ModelBinderProviders.Insert(0, new PageSortFilterProvider());
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
            .AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddScoped(s => s.GetService<IHttpContextAccessor>().HttpContext.User);
            services.AddScoped<IUserService, UserService>();

            new DalInitializer(services, Configuration, Environment).AddServices();
            new BllInitializer(services, Configuration, Environment).AddServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseCors(builder => builder
                .WithOrigins(Configuration.GetSection("AllowedOrigins").Get<string[]>())
                .AllowAnyHeader()
                .AllowAnyMethod());
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
