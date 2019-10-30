using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Common.Controllers
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/cards")]
    public class CardController : Controller
    {
        private readonly IMapper _mapper;
        public ICardRepository _cardRepository;

        public CardController(
            IMapper mapper,
            ICardRepository cardRepository) 
        {
            _mapper = mapper;
            _cardRepository = cardRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PagedData<CardDto>>> Query([Base64Binder] CardQuery cardQuery)
        {
            var cards = await _cardRepository.GetCardsAsync(cardQuery);
            return _mapper.Map<PagedData<CardDto>>(cards);
        }
    }
}
