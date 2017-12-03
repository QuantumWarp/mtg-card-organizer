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
    [Route("api/[controller]")]
    public class CollectionController : Controller
    {
        public ICollectionManager _collectionManager;

        public CollectionController(ICollectionManager collectionManager)
        {
            _collectionManager = collectionManager;
        }

        [HttpGet]
        public IEnumerable<CollectionDto> GetAll()
        {
            return null; // TODO
        }
    }
}
