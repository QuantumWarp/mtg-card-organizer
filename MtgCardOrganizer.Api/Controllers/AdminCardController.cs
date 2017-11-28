using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgCoreLib;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;

namespace MtgCardOrganizer.Api.Controllers
{
    [Route("api/admin/[controller]")]
    public class AdminCardController : Controller
    {
        private AdminCardsManager _adminCardsManager;

        public AdminCardController(AdminCardsManager adminCardsManager)
        {
            _adminCardsManager = adminCardsManager;
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
