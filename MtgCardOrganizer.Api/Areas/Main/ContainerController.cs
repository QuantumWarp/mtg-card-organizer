using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Main
{
    [Authorize(Roles = Roles.StandardUser)]
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Container>> Get(int id)
        {
            return await _containerRepository.GetAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Container container)
        {
            await _containerRepository.CreateAsync(container);
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _containerRepository.DeleteAsync(id);
            return NoContent();
        }

        // Export/Import
        [HttpGet("{id}/export")]
        public async Task<ActionResult<string>> Export(int id)
        {
            return await _importExportService.ExportAsync(id);
        }

        [HttpPost("{id}/import")]
        public async Task<IActionResult> Import(int id, [FromBody] string importString)
        {
            await _importExportService.ImportAsync(id, importString);
            return NoContent();
        }

        // Bookmarks
        [HttpGet("bookmarks")]
        public async Task<ActionResult<PagedData<Container>>> GetBookmarkedContainers(Paging paging)
        {
            return await _containerRepository.GetBookmarksAsync(paging);
        }

        [HttpPost("{id}/toggle-bookmark")]
        public async Task<IActionResult> ToggleBookmark(int id)
        {
            await _containerRepository.ToggleBookmarkAsync(id);
            return Ok();
        }
    }
}
