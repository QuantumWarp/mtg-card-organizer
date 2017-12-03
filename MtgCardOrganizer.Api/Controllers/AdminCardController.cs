using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Managers;

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

        [HttpPost]
        public void RepopulateFromMtgJson() 
        {

        }

        [HttpPost]
        public void AddCardInfos(IEnumerable<CardSetInfoDto> fullCardInfos)
        {
            
        }

        [HttpPost]
        public void ClearCardInfos() 
        {

        }
    }
}
