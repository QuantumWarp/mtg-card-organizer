using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Common
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/sets")]
    public class SetController : Controller
    {
        public ISetRepository _setRepository;

        public SetController(ISetRepository setRepository) 
        {
            _setRepository = setRepository;
        }

        [HttpGet]
        public async Task<List<Set>> Query()
        {
            return await _setRepository.GetSetsAsync();
        }
    }
}
