using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;
using MtgCoreLib.Utilities.Parsers;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/[controller]")]
    public class AdminCardController : Controller
    {
        private IAdminCardManager _adminCardsManager;

        public AdminCardController(IAdminCardManager adminCardsManager)
        {
            _adminCardsManager = adminCardsManager;
        }

        [HttpPost("import-cards")]
        public void ImportCards(string importString) 
        {
            _adminCardsManager.ImportCards(ParseType.MtgJson, importString);
        }

        [HttpPost("clear-cards")]
        public void ClearCards() 
        {
            _adminCardsManager.ClearCards();
        }
    }
}
