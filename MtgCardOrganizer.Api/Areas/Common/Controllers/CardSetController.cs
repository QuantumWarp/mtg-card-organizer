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
    [Route("api/card-sets")]
    public class CardSetController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ICardSetRepository _cardSetRepository;

        public CardSetController(
            IMapper mapper,
            ICardSetRepository cardSetRepository) 
        {
            _mapper = mapper;
            _cardSetRepository = cardSetRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PagedData<CardSetDto>>> Query([Base64Binder] CardSetQuery cardQuery)
        {
            var cardSets = await _cardSetRepository.GetCardSetsAsync(cardQuery);
            return _mapper.Map<PagedData<CardSetDto>>(cardSets);
        }
    }
}
