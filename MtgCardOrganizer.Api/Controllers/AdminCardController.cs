using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AdminCardController : Controller
    {
        private IAdminCardRepository _adminCardsRepository;

        public AdminCardController(IAdminCardRepository adminCardsRepository)
        {
            _adminCardsRepository = adminCardsRepository;
        }

        [HttpPost("import-cards")]
        public async Task<IActionResult> ImportCards([FromBody] ImportRequest importRequest) 
        {
            await _adminCardsRepository.ImportCardsAsync(importRequest);
            return new OkResult();
        }

        [HttpPost("clear-cards")]
        public IActionResult ClearCards() 
        {
            _adminCardsRepository.ClearCards();
            return new OkResult();
        }
    }
}
