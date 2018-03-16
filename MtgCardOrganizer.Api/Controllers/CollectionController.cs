using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
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
        public bool Delete(int collectionId)
        {
            return _collectionManager.DeleteCollection(collectionId);
        }
        
        [HttpGet]
        [Route("{collectionId}/cards")]
        public PagedData<CardInstanceDto> GetCards(int collectionId, QueryModel<CardInstanceDto> queryModel)
        {
            return _collectionManager.GetCards(collectionId, queryModel);
        }
        
        [HttpPost]
        [Route("{collectionId}/cards")]
        public bool AddCards(int collectionId, [FromBody] List<AddCollectionCardCommand> cardSetInfoOtherInfoDict)
        {
            return _collectionManager.AddCards(collectionId, cardSetInfoOtherInfoDict);
        }

        [HttpPatch]
        [Route("{collectionId}/cards")]
        public bool DeleteCards(int collectionId, List<int> cardSetInfoIds)
        {
            return _collectionManager.DeleteCards(collectionId, cardSetInfoIds);
        }

        [HttpGet]
        [Route("{collectionId}/download")]
        public IActionResult Download(int collectionId) {
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
        public bool Import(int? collectionId, [FromBody] string importString) {
            return _collectionManager.Import(collectionId, importString);
        }
    }
}
