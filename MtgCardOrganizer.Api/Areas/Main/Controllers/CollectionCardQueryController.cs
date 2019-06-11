using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Main.Controllers
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/collections")]
    public class CollectionCardQueryController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ICollectionCardQueryRepository _collectionCardQueryRepository;

        public CollectionCardQueryController(
            IMapper mapper,
            ICollectionCardQueryRepository collectionCardQueryRepository)
        {
            _mapper = mapper;
            _collectionCardQueryRepository = collectionCardQueryRepository;
        }

        
        [HttpGet("cards/group-by-card")]
        public async Task<ActionResult<PagedData<CardInstanceGroupedCardDto>>> GetGroupedByCard([Base64Binder] CardInstanceQuery cardQuery)
        {
            var result = await _collectionCardQueryRepository.GetGroupedByCardAsync(cardQuery);
            return _mapper.Map<PagedData<CardInstanceGroupedCardDto>>(result);
        }
        
        [HttpGet("cards/group-by-cardset")]
        public async Task<ActionResult<PagedData<CardInstanceGroupedCardSetDto>>> GetGroupedByCardSet([Base64Binder] CardInstanceQuery cardQuery)
        {
            var result = await _collectionCardQueryRepository.GetGroupedByCardSetAsync(cardQuery);
            return _mapper.Map<PagedData<CardInstanceGroupedCardSetDto>>(result);
        }

        [HttpGet("cards")]
        public async Task<ActionResult<PagedData<CardInstanceDto>>> GetInstances([Base64Binder] CardInstanceQuery cardQuery)
        {
            var result = await _collectionCardQueryRepository.GetInstancesAsync(cardQuery);
            return _mapper.Map<PagedData<CardInstanceDto>>(result);
        }
    }
}
