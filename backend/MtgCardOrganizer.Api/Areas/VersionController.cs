using Microsoft.AspNetCore.Mvc;
using System;

namespace MtgCardOrganizer.Api.Areas
{
    namespace MtgCardOrganizer.Api.Controllers.Admin
    {
        [Route("api/version")]
        public class VersionController : Controller
        {
            public ActionResult<VersionDto> Get()
            {
                return new VersionDto {
                    Title = "Mtg Card Organizer",
                    Version = "1.0.0",
                    ReleaseDate = new DateTime(2018, 10, 05),
                    Copyright = "Copyright © John Lowther 2018",
                };
            }
        }

        public class VersionDto
        {
            public string Title { get; set; }
            public string Version { get; set; }
            public DateTime ReleaseDate { get; set; }
            public string Copyright { get; set; }
        }
    }
}
