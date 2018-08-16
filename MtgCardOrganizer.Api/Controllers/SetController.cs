using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
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
