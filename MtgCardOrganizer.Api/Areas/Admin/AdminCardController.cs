using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Admin
{
    [Authorize(Roles = Roles.Administrator)]
    [Route("api/admin")]
    public class AdminCardController : Controller
    {
        private IAdminCardService _adminCardService;

        public AdminCardController(IAdminCardService adminCardService)
        {
            _adminCardService = adminCardService;
        }

        [HttpPost("import-cards")]
        public async Task<IActionResult> ImportCards([FromBody] AdminImportRequest importRequest) 
        {
            await _adminCardService.ImportCardsAsync(importRequest);
            return new OkResult();
        }
    }
}
