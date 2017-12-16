using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MtgCoreLib.Contexts;
using MtgCoreLib.Dtos.Cards;

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
            return new PagedData<CardDto>(_cardContext.Cards.OrderBy(x => x.Name).Select(x => x.AsDto()).ApplyPageSortFilter(pageSortFilter), _cardContext.Cards.Count());
        }
    }
}
