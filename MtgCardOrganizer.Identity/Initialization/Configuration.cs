using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IO;
using System.Text;

namespace MtgCardOrganizer.Identity.Initialization
{
    public static class Configuration
    {
        public static readonly SymmetricSecurityKey SymmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("86759592-46f3-441b-ad0e-e4670e04a2b3"));

        static Configuration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var Configuration = builder.Build();

            ConnectionStrings = new ConnectionStrings()
            {
                Default = Configuration["ConnectionString"]
            };
        }

        public static ConnectionStrings ConnectionStrings { get; private set; }
    }

    public class ConnectionStrings
    {
        public string Default { get; set; }
    }
}
