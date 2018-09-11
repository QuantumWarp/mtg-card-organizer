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
    [Route("api/card-sets")]
    public class CardSetController : Controller
    {
        public ICardSetRepository _cardSetRepository;

        public CardSetController(ICardSetRepository cardSetRepository) 
        {
            _cardSetRepository = cardSetRepository;
        }

        [HttpGet]
        public async Task<PagedData<CardSet>> Query([Base64Binder] CardQuery cardQuery)
        {
            return await _cardSetRepository.GetCardSetsAsync(cardQuery);
        }
    }
}
