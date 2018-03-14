using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/sets")]
    public class SetController : Controller
    {
        public ISetManager _setManager;

        public SetController(ISetManager setManager) 
        {
            _setManager = setManager;
        }

        [HttpGet, Route("")]
        public PagedData<SetDto> Query(PageSortFilter pageSortFilter)
        {
            return _setManager.GetSets(pageSortFilter);
        }
    }
}
