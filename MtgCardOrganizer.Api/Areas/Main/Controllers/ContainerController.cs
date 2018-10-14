using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Requests;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Main.Controllers
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/containers")]
    public class ContainerRepository : Controller
    {
        private readonly IMapper _mapper;
        private readonly IPermissionRepository _permissionRepository;
        private readonly IContainerRepository _containerRepository;
        private readonly IImportExportService _importExportService;

        public ContainerRepository(
            IMapper mapper,
            IPermissionRepository permissionRepository,
            IContainerRepository containerRepository,
            IImportExportService importExportService)
        {
            _mapper = mapper;
            _permissionRepository = permissionRepository;
            _containerRepository = containerRepository;
            _importExportService = importExportService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContainerDto>> Get(int id)
        {
            var container = await _containerRepository.GetAsync(id);
            var containerDto = _mapper.Map<ContainerDto>(container);
            containerDto.IsBookmarked = await _containerRepository.IsBookmarkedAsync(id);
            containerDto.Permission = await _permissionRepository.GetPermissionAsync(id);
            return containerDto;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContainerDto containerDto)
        {
            var container = _mapper.Map<Container>(containerDto);
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
        public async Task<ActionResult<PagedData<ContainerDto>>> GetBookmarkedContainers([Base64Binder] Paging paging)
        {
            var containers = await _containerRepository.GetBookmarksAsync(paging);
            return _mapper.Map<PagedData<ContainerDto>>(containers);
        }

        [HttpPost("{id}/toggle-bookmark")]
        public async Task<IActionResult> ToggleBookmark(int id)
        {
            await _containerRepository.ToggleBookmarkAsync(id);
            return NoContent();
        }

        // Permissions
        [HttpGet("{id}/permissions")]
        public async Task<ActionResult<PagedData<UserPermissionDto>>> GetPermissions(int id, [Base64Binder] Paging paging)
        {
            await _permissionRepository.CheckAsync(id, Permission.Admin);

            var links = await _permissionRepository.GetPermissionsAsync(id, paging);
            return _mapper.Map<PagedData<UserPermissionDto>>(links);
        }

        [HttpPost("{id}/update-permission")]
        public async Task<IActionResult> UpdatePermssion(int id, [FromBody] UserPermissionDto userPermissionDto)
        {
            if (userPermissionDto.UserId == null)
                throw new Exception("UserId required");

            await _permissionRepository.CheckAsync(id, Permission.Admin);

            var link = _mapper.Map<ContainerUserLink>(userPermissionDto);
            link.ContainerId = id;
            await _permissionRepository.UpdatePermissionAsync(link);
            return NoContent();
        }
    }
}
