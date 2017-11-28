using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Contexts;

namespace MtgCoreLib.Managers
{
    public class AdminCardManager
    {
        private CardContext _cardContext;

        public AdminCardManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public void ClearCards()
        {
            _cardContext.CardSetInfos.RemoveRange(_cardContext.CardSetInfos);
        }
    }
}
