using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MtgCardOrganizer.Api;

namespace MtgCardOrganizer.Tests
{
    [TestClass]
    public class AutomapperTest
    {
        [TestMethod]
        public void ValidConfigurationTest()
        {
            var config = new MapperConfiguration(x => x.AddProfiles(typeof(Startup)));
            var mapper = new Mapper(config);
            (mapper as IMapper).ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
