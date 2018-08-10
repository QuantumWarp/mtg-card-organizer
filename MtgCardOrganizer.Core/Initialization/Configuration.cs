using Microsoft.Extensions.Configuration;
using System.IO;

namespace MtgCardOrganizer.Core.Initialization
{
    public static class Configuration
    {
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
