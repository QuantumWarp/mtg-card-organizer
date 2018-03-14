using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib;
using MtgCoreLib.Dtos.Admin;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;
using MtgCoreLib.Utilities.Parsers;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AdminCardController : Controller
    {
        private IAdminCardManager _adminCardsManager;

        public AdminCardController(IAdminCardManager adminCardsManager)
        {
            _adminCardsManager = adminCardsManager;
        }

        [HttpPost("import-cards")]
        public HttpResponseMessage ImportCards(ImportCommand importCommand) 
        {
            _adminCardsManager.ImportCards(importCommand);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost("clear-cards")]
        public HttpResponseMessage ClearCards() 
        {
            _adminCardsManager.ClearCards();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
