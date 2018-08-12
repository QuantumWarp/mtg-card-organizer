using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Responses;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/cards")]
    public class CardController : Controller
    {
        public ICardRepository _cardRepository;

        public CardController(ICardRepository cardRepository) 
        {
            _cardRepository = cardRepository;
        }

        [HttpGet, Route("")]
        public async Task<PagedData<CardSet>> Query([Base64Binder] CardQuery cardQuery)
        {
            return await _cardRepository.GetCardSetsAsync(cardQuery);
        }
    }
}
