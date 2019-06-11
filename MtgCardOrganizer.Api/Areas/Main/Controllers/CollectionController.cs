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
    public class CollectionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ICollectionRepository _collectionRepository;

        public CollectionController(
            IMapper mapper,
            ICollectionRepository collectionRepository)
        {
            _mapper = mapper;
            _collectionRepository = collectionRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionDto>> Get(int id)
        {
            var collection = await _collectionRepository.GetAsync(id);
            var collectionDto = _mapper.Map<CollectionDto>(collection);
            collectionDto.IsBookmarked = await _collectionRepository.IsBookmarkedAsync(id);
            return collectionDto;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CollectionDto collectionDto)
        {
            var collection = _mapper.Map<Collection>(collectionDto);
            await _collectionRepository.CreateAsync(collection);
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _collectionRepository.DeleteAsync(id);
            return NoContent();
        }
        
        // Card Tasks
        [HttpPost("{id}/cards")]
        public async Task<IActionResult> AddCards(int id, [FromBody] List<CardInstance> cardInstanceDtos)
        {
            var cardInstances = _mapper.Map<List<CardInstance>>(cardInstanceDtos);
            await _collectionRepository.AddCardsAsync(id, cardInstances);
            return NoContent();
        }

        [HttpPost("{id}/cards/delete")]
        public async Task<IActionResult> DeleteCards(int id, [FromBody] List<int> cardInstanceIds)
        {
            await _collectionRepository.DeleteCardsAsync(id, cardInstanceIds);
            return NoContent();
        }

        // Favorites
        [HttpGet("bookmarks")]
        public async Task<ActionResult<PagedData<CollectionDto>>> GetBookmarks([Base64Binder] Paging paging)
        {
            var collections = await _collectionRepository.GetBookmarksAsync(paging);
            return _mapper.Map<PagedData<CollectionDto>>(collections);
        }

        [HttpPost("{id}/toggle-bookmark")]
        public async Task<IActionResult> ToggleBookmark(int id)
        {
            await _collectionRepository.ToggleBookmarkAsync(id);
            return NoContent();
        }
    }
}
