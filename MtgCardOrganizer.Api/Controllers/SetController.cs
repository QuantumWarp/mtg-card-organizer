using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/[controller]")]
    public class SetController : Controller
    {
        public ISetManager _setManager;

        public SetController(ISetManager setManager) 
        {
            _setManager = setManager;
        }

        [HttpPost, Route("query")]
        public PagedData<SetDto> Query([FromBody] PageSortFilter pageSortFilter = null)
        {
            return _setManager.GetSets(pageSortFilter);
        }
    }
}
