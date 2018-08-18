using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Core.Entities.Containers;
using MtgCardOrganizer.Core.Repositories;

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

        [HttpGet("{id?}")]
        public async Task<Container> Get(int? id)
        {
            return await _containerRepository.GetAsync(id);
        }

        [HttpPost]
        public async Task<Container> Create([FromBody] Container container)
        {
            return await _containerRepository.CreateAsync(container);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _containerRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/import")]
        public async Task<IActionResult> Import(int id, [FromBody] string importString)
        {
            await _containerRepository.ImportAsync(id, importString);
            return NoContent();
        }
    }
}
