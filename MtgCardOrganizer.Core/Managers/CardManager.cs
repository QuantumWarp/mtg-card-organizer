using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Initialization;
using MtgCoreLib.Utilities.General;

namespace MtgCoreLib.Managers
{
    public interface ICardManager
    {
        PagedData<CardDetailsDto> GetCards(QueryModel<CardDetailsDto> queryModel);
    }

    public class CardManager : ICardManager
    {
        private MtgCoreLibContext _dbContext;

        public CardManager(MtgCoreLibContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PagedData<CardDetailsDto> GetCards(QueryModel<CardDetailsDto> queryModel)
        {
            var defaultSort = new PropertySort<CardDetailsDto>(nameof(CardDetailsDto.Name));
            return _dbContext.CardSetInfos.AsPagedData(queryModel, defaultSort);
        }
    }
}
