using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Cards;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/[controller]")]
    public class CollectionController : Controller
    {
        [HttpGet]
        public IEnumerable<CollectionDto> GetAll()
        {
            
        }
    }
}
