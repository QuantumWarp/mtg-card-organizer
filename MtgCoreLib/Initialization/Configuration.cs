using Microsoft.Extensions.Configuration;
using System.IO;

namespace MtgCoreLib.Initialization
{
    public static class Configuration
    {
        static Configuration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var Configuration = builder.Build();

            var connectionStringSection = Configuration.GetSection("ConnectionStrings");
            ConnectionStrings = new ConnectionStrings()
            {
                Default = connectionStringSection["Default"]
            };
        }

        public static ConnectionStrings ConnectionStrings { get; private set; }
    }

    public class ConnectionStrings
    {
        public string Default { get; set; }
    }
}
