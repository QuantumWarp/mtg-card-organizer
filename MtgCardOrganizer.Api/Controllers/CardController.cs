using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/[controller]")]
    public class CardController : Controller
    {
        public ICardManager _cardManager;

        public CardController(ICardManager cardManager) 
        {
            _cardManager = cardManager;
        }

        [HttpGet, Route("test")]
        public object Test() {
            return new { test = "test"};
        }

        [HttpGet, Route("all")]
        public IEnumerable<CardDto> GetAll()
        {
            return null; // TODO
        }
    }
}
