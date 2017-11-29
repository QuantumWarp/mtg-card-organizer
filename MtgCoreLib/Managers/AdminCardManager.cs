using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Contexts;
using MtgCoreLib.Dtos.Cards;

namespace MtgCoreLib.Managers
{
    public class AdminCardManager
    {
        private CardContext _cardContext;

        public AdminCardManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public void AddCardInfos(IEnumerable<CardSetInfoDto> cards) {
            
        }

        public void ClearCards()
        {
            _cardContext.CardSetInfos.RemoveRange(_cardContext.CardSetInfos);
        }
    }
}
