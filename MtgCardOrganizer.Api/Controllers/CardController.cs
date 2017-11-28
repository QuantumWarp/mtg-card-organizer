using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/[controller]")]
    public class CardController : Controller
    {
        [HttpGet]
        public IEnumerable<CardDto> GetAll()
        {
            
        }
    }
}
