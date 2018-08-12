using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Enums;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests;
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
        [Route("")]
        public async Task<PagedData<Collection>> Query([FromQuery] QueryModel<Collection> queryModel)
        {
            return await _collectionRepository.GetCollectionsAsync(queryModel);
        }

        [HttpPost]
        [Route("")]
        public async Task<bool> Create([FromBody] Collection collection)
        {
            return await _collectionRepository.CreateCollectionAsync(collection);
        }
        
        [HttpDelete]
        [Route("{collectionId}")]
        public async Task<IActionResult> Delete(int collectionId)
        {
            if (_collectionRepository.UserHasPermission(Permission.Owner, collectionId)) return Unauthorized();
            await _collectionRepository.DeleteCollectionAsync(collectionId);
            return NoContent();
        }
        
        [HttpGet]
        [Route("{collectionId}/cards")]
        public async Task<IActionResult> GetCards(int collectionId, [Base64Binder] CardQuery cardQuery)
        {
            if (_collectionRepository.UserHasPermission(Permission.Read, collectionId)) return Unauthorized();
            return Ok(await _collectionRepository.GetCardsAsync(collectionId, cardQuery));
        }
        
        [HttpPost]
        [Route("{collectionId}/cards")]
        public IActionResult AddCards(int collectionId, [FromBody] List<CardInstance> cardInstances)
        {
            if (_collectionRepository.UserHasPermission(Permission.Write, collectionId)) return Unauthorized();
            _collectionRepository.AddCardsAsync(collectionId, cardInstances);
            return NoContent();
        }

        [HttpPatch]
        [Route("{collectionId}/cards")]
        public IActionResult DeleteCards(int collectionId, [FromBody] List<int> cardInstanceIds)
        {
            if (_collectionRepository.UserHasPermission(Permission.Write, collectionId)) return Unauthorized();
            _collectionRepository.DeleteCardsAsync(collectionId, cardInstanceIds);
            return NoContent();
        }

        [HttpGet]
        [Route("{collectionId}/download")]
        public IActionResult Download(int collectionId) {
            if (_collectionRepository.UserHasPermission(Permission.Read, collectionId)) return Unauthorized();
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(_collectionRepository.ExportAsync(collectionId));
            writer.Flush();
            stream.Position = 0;
            var response = File(stream, "application/octet-stream", "collection-export.json"); // FileStreamResult
            return response;
        }
        
        [HttpPost]
        [Route("{collectionId}/import")]
        [Route("import")]
        public async Task<IActionResult> Import(int? collectionId, [FromBody] string importString) {
            if (collectionId.HasValue && _collectionRepository.UserHasPermission(Permission.Write, collectionId.Value)) return Unauthorized();
            await _collectionRepository.Import(collectionId, importString);
            return NoContent();
        }
    }
}
