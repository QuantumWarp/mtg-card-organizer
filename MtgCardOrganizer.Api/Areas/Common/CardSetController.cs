using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Common
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/card-sets")]
    public class CardSetController : Controller
    {
        public ICardSetRepository _cardSetRepository;

        public CardSetController(ICardSetRepository cardSetRepository) 
        {
            _cardSetRepository = cardSetRepository;
        }

        [HttpGet]
        public async Task<PagedData<CardSet>> Query([Base64Binder] CardSetQuery cardQuery)
        {
            return await _cardSetRepository.GetCardSetsAsync(cardQuery);
        }
    }
}
