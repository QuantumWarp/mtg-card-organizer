using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Requests.CardQueries;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/collections")]
    public class CollectionController : Controller
    {
        public ICollectionRepository _collectionRepository;

        public CollectionController(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        [HttpGet]
        public async Task<PagedData<Collection>> GetMany([Base64Binder] Paging paging)
        {
            return await _collectionRepository.GetManyAsync(paging);
        }

        [HttpGet("{id}")]
        public async Task<Collection> Get(int id)
        {
            return await _collectionRepository.GetAsync(id);
        }

        [HttpPost]
        public async Task<Collection> Create([FromBody] Collection collection)
        {
            return await _collectionRepository.CreateAsync(collection);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _collectionRepository.DeleteAsync(id);
            return NoContent();
        }
        
        // Card Tasks

        [HttpGet("{id}/cards")]
        public async Task<PagedData<CardInstance>> GetCards(int id, [Base64Binder] CardInstanceQuery cardQuery)
        {
            return await _collectionRepository.GetCardsAsync(id, cardQuery);
        }
        
        [HttpPost("{id}/cards")]
        public async Task<List<CardInstance>> AddCards(int id, [FromBody] List<CardInstance> cardInstances)
        {
            return await _collectionRepository.AddCardsAsync(id, cardInstances);
        }

        [HttpPost("{id}/cards/delete")]
        public async Task<IActionResult> DeleteCards(int id, [FromBody] List<int> cardInstanceIds)
        {
            await _collectionRepository.DeleteCardsAsync(id, cardInstanceIds);
            return NoContent();
        }
    }
}
