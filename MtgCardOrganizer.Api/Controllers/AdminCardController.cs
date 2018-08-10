using System.Net;
using System.Net.Http;
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
        public HttpResponseMessage ImportCards([FromBody] ImportRequest importRequest) 
        {
            _adminCardsRepository.ImportCards(importRequest);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost("clear-cards")]
        public HttpResponseMessage ClearCards() 
        {
            _adminCardsRepository.ClearCards();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
