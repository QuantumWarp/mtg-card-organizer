using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MtgCoreLib.Contexts;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Utilities.General;

namespace MtgCoreLib.Managers
{
    public interface ICardManager
    {
        PagedData<CardDto> GetCards(PageSortFilter pageSortFilter);
    }

    public class CardManager : ICardManager
    {
        private CardContext _cardContext;

        public CardManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public PagedData<CardDto> GetCards(PageSortFilter pageSortFilter)
        {
            return new PagedData<CardDto>(_cardContext.Cards.ApplyPageSortFilter(pageSortFilter).Select(x => x.AsDto()), _cardContext.Cards.Count());
        }
    }
}
