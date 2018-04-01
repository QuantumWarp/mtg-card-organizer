using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/collections")]
    public class CollectionController : Controller
    {
        public ICollectionManager _collectionManager;

        public CollectionController(ICollectionManager collectionManager)
        {
            _collectionManager = collectionManager;
        }

        [HttpGet]
        [Route("")]
        public PagedData<CollectionDto> Query(QueryModel<CollectionDto> queryModel)
        {
            return _collectionManager.GetCollections(queryModel);
        }

        [HttpPost]
        [Route("")]
        public bool Create([FromBody] CollectionDto collectionDto)
        {
            return _collectionManager.CreateCollection(collectionDto);
        }
        
        [HttpDelete]
        [Route("{collectionId}")]
        public IActionResult Delete(int collectionId)
        {
            if (_collectionManager.UserHasPermission(Permission.Owner, collectionId)) return Unauthorized();
            _collectionManager.DeleteCollection(collectionId);
            return NoContent();
        }
        
        [HttpGet]
        [Route("{collectionId}/cards")]
        public IActionResult GetCards(int collectionId, QueryModel<CardInstanceDto> queryModel)
        {
            if (_collectionManager.UserHasPermission(Permission.Read, collectionId)) return Unauthorized();
            return Ok(_collectionManager.GetCards(collectionId, queryModel));
        }
        
        [HttpPost]
        [Route("{collectionId}/cards")]
        public IActionResult AddCards(int collectionId, [FromBody] List<AddCollectionCardCommand> cardSetInfoOtherInfoDict)
        {
            if (_collectionManager.UserHasPermission(Permission.Write, collectionId)) return Unauthorized();
            _collectionManager.AddCards(collectionId, cardSetInfoOtherInfoDict);
            return NoContent();
        }

        [HttpPatch]
        [Route("{collectionId}/cards")]
        public IActionResult DeleteCards(int collectionId, List<int> cardSetInfoIds)
        {
            if (_collectionManager.UserHasPermission(Permission.Write, collectionId)) return Unauthorized();
            _collectionManager.DeleteCards(collectionId, cardSetInfoIds);
            return NoContent();
        }

        [HttpGet]
        [Route("{collectionId}/download")]
        public IActionResult Download(int collectionId) {
            if (_collectionManager.UserHasPermission(Permission.Read, collectionId)) return Unauthorized();
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            _collectionManager.Export(collectionId);
            writer.Write(_collectionManager.Export(collectionId));
            writer.Flush();
            stream.Position = 0;
            var response = File(stream, "application/octet-stream", "collection-export.json"); // FileStreamResult
            return response;
        }
        
        [HttpPost]
        [Route("{collectionId}/import")]
        [Route("import")]
        public IActionResult Import(int? collectionId, [FromBody] string importString) {
            if (collectionId.HasValue && _collectionManager.UserHasPermission(Permission.Write, collectionId.Value)) return Unauthorized();
            _collectionManager.Import(collectionId, importString);
            return NoContent();
        }
    }
}
