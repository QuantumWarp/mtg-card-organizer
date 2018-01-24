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
    [Route("api/cards")]
    public class CardController : Controller
    {
        public ICardManager _cardManager;

        public CardController(ICardManager cardManager) 
        {
            _cardManager = cardManager;
        }

        [HttpGet, Route("")]
        public PagedData<CardDto> Query(PageSortFilter pageSortFilter)
        {
            return _cardManager.GetCards(pageSortFilter);
        }
    }
}
