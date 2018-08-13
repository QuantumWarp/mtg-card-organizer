using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/containers")]
    public class ContainerRepository : Controller
    {
        public IContainerRepository _containerRepository;

        public ContainerRepository(IContainerRepository containerRepository)
        {
            _containerRepository = containerRepository;
        }

        [HttpGet]
        [Route("")]
        [Route("{id}")]
        public async Task<Container> Get(int? id)
        {
            return await _containerRepository.GetAsync(id);
        }

        [HttpPost]
        [Route("")]
        public async Task<Container> Create([FromBody] Container container)
        {
            return await _containerRepository.CreateAsync(container);
        }
        
        [HttpDelete]
        [Route("{collectionId}")]
        public async Task<IActionResult> Delete(int containerId)
        {
            await _containerRepository.DeleteAsync(containerId);
            return NoContent();
        }
    }
}
