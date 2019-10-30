using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Common.Controllers
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/sets")]
    public class SetController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ISetRepository _setRepository;

        public SetController(
            IMapper mapper,
            ISetRepository setRepository) 
        {
            _mapper = mapper;
            _setRepository = setRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<SetDto>>> Query()
        {
            var sets = await _setRepository.GetSetsAsync();
            return _mapper.Map<List<SetDto>>(sets);
        }
    }
}
