using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        }

        public IConfigurationRoot Configuration { get; }

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

            services.AddTransient(s => s.GetService<IHttpContextAccessor>().HttpContext.User);
            services.AddTransient<UserService>();

            new DalInitializer(services, Configuration).AddServices();
            new BllInitializer(services, Configuration).AddServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
