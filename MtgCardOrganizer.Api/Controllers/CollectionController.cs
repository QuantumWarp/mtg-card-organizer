using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests;
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
        [Route("{id}")]
        public async Task<Collection> Get(int collectionId)
        {
            return await _collectionRepository.GetAsync(collectionId);
        }

        [HttpPost]
        [Route("")]
        public async Task<Collection> Create([FromBody] Collection collection)
        {
            return await _collectionRepository.CreateAsync(collection);
        }
        
        [HttpDelete]
        [Route("{collectionId}")]
        public async Task<IActionResult> Delete(int collectionId)
        {
            await _collectionRepository.DeleteAsync(collectionId);
            return NoContent();
        }
        
        [HttpGet]
        [Route("{collectionId}/cards")]
        public async Task<PagedData<CardInstance>> GetCards(int collectionId, [Base64Binder] CardQuery cardQuery)
        {
            return await _collectionRepository.GetCardsAsync(collectionId, cardQuery);
        }
        
        [HttpPost]
        [Route("{collectionId}/cards")]
        public async Task<List<CardInstance>> AddCards(int collectionId, [FromBody] List<CardInstance> cardInstances)
        {
            return await _collectionRepository.AddCardsAsync(collectionId, cardInstances);
        }

        [HttpPatch]
        [Route("{collectionId}/cards")]
        public IActionResult DeleteCards(int collectionId, [FromBody] List<int> cardInstanceIds)
        {
            _collectionRepository.DeleteCardsAsync(collectionId, cardInstanceIds);
            return NoContent();
        }

        // [HttpGet]
        // [Route("{collectionId}/download")]
        // public async Task<IActionResult> Download(int collectionId) {
        //     var stream = new MemoryStream();
        //     var writer = new StreamWriter(stream);
        //     writer.Write(await _collectionRepository.ExportAsync(collectionId));
        //     writer.Flush();
        //     stream.Position = 0;
        //     var response = File(stream, "application/octet-stream", "collection-export.json"); // FileStreamResult
        //     return response;
        // }
        
        // [HttpPost]
        // [Route("{collectionId}/import")]
        // [Route("import")]
        // public async Task<IActionResult> Import(int? collectionId, [FromBody] string importString) {
        //     await _collectionRepository.ImportAsync(collectionId, importString);
        //     return NoContent();
        // }
    }
}
