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
        PagedData<CardDetailsDto> GetCards(PageSortFilter pageSortFilter);
    }

    public class CardManager : ICardManager
    {
        private MtgCoreLibContext _dbContext;

        public CardManager(MtgCoreLibContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PagedData<CardDetailsDto> GetCards(PageSortFilter pageSortFilter)
        {
            return new PagedData<CardDetailsDto>(_dbContext.CardSetInfos.ProjectTo<CardDetailsDto>(Mapper.Configuration).ApplyPageSortFilter(pageSortFilter), _dbContext.Cards.Count());
        }
    }
}
