﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Helpers;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Responses;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Controllers.Common
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/cards")]
    public class CardController : Controller
    {
        public ICardRepository _cardRepository;

        public CardController(ICardRepository cardRepository) 
        {
            _cardRepository = cardRepository;
        }

        [HttpGet]
        public async Task<PagedData<Card>> Query([Base64Binder] CardQuery cardQuery)
        {
            return await _cardRepository.GetCardsAsync(cardQuery);
        }
    }
}