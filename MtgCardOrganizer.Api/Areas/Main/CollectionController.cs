using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Main
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/collections")]
    public class CollectionController : Controller
    {
        public ICollectionRepository _collectionRepository;

        public CollectionController(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Collection>> Get(int id)
        {
            return await _collectionRepository.GetAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Collection collection)
        {
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

        [HttpGet("{id}/cards")]
        public async Task<ActionResult<PagedData<CardInstance>>> GetCards(int id, [Base64Binder] CardInstanceQuery cardQuery)
        {
            return await _collectionRepository.GetCardsAsync(id, cardQuery);
        }
        
        [HttpPost("{id}/cards")]
        public async Task<ActionResult<List<CardInstance>>> AddCards(int id, [FromBody] List<CardInstance> cardInstances)
        {
            return await _collectionRepository.AddCardsAsync(id, cardInstances);
        }

        [HttpPost("{id}/cards/delete")]
        public async Task<IActionResult> DeleteCards(int id, [FromBody] List<int> cardInstanceIds)
        {
            await _collectionRepository.DeleteCardsAsync(id, cardInstanceIds);
            return NoContent();
        }

        // Favorites
        [HttpGet("favorites")]
        public async Task<ActionResult<PagedData<Collection>>> GetFavorites([Base64Binder] Paging paging)
        {
            return await _collectionRepository.GetFavoritesAsync(paging);
        }

        [HttpPost("{id}/toggle-favorite")]
        public async Task<IActionResult> ToggleFavorite(int id)
        {
            await _collectionRepository.ToggleFavoriteAsync(id);
            return Ok();
        }
    }
}
