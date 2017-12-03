using System;
using System.Collections.Generic;
using System.Text;
using MtgCoreLib.Contexts;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Utilities.Parsers;

namespace MtgCoreLib.Managers
{
    public interface IAdminCardManager
    {
        void AddCardInfos(IEnumerable<CardSetInfoDto> cardSet);
        void ClearCards();
    }

    public class AdminCardManager : IAdminCardManager
    {
        private CardContext _cardContext;

        public AdminCardManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public void RetrieveAndAdd(ParseType parseType)
        {
            var parser = parseType.GetParser();
            var text = parser.Retrieve();
            parser.Parse(text);
        }

        public void AddCardInfos(IEnumerable<CardSetInfoDto> cards) {
            
        }

        public void ClearCards()
        {
            _cardContext.CardSetInfos.RemoveRange(_cardContext.CardSetInfos);
        }
    }
}
