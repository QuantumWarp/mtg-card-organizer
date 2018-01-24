using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;

namespace MtgCardOrganizer.Api.Controllers
{
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
        public IEnumerable<CollectionDto> Query()
        {
            return new List<CollectionDto>(); // TODO
        }

        [HttpPost]
        [Route("")]
        [Route("{parentCollectionId}")]
        public int Create(int? parentCollectionId) {
            return 0;
        }
        
        [HttpDelete]
        [Route("{collectionId}")]
        public bool Delete(int collectionId) {
            return false;
        }
    }
}
