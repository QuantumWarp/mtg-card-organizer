﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MtgCoreLib.Contexts;
using MtgCoreLib.Dtos.Cards;

namespace MtgCoreLib.Managers
{
    public interface ISetManager
    {
        PagedData<SetDto> GetSets(PageSortFilter pageSortFilter);
    }

    public class SetManager : ISetManager
    {
        private CardContext _cardContext;

        public SetManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public PagedData<SetDto> GetSets(PageSortFilter pageSortFilter)
        {
            return new PagedData<SetDto>(_cardContext.Sets.OrderBy(x => x.Name).Select(x => x.AsDto()).ApplyPageSortFilter(pageSortFilter), _cardContext.Sets.Count());
        }
    }
}