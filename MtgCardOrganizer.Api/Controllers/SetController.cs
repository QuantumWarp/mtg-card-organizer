using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Repositories;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;

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
