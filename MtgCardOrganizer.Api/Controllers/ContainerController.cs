using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Repositories;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/containers")]
    public class ContainerRepository : Controller
    {
        private readonly IContainerRepository _containerRepository;
        private readonly IImportExportService _importExportService;

        public ContainerRepository(
            IContainerRepository containerRepository,
            IImportExportService importExportService)
        {
            _containerRepository = containerRepository;
            _importExportService = importExportService;
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

        [HttpGet("{id}/export")]
        public async Task<string> Export(int id)
        {
            return await _importExportService.ExportAsync(id);
        }

        [HttpPost("{id}/import")]
        public async Task<IActionResult> Import(int id, [FromBody] string importString)
        {
            await _importExportService.ImportAsync(id, importString);
            return NoContent();
        }

    }
}
