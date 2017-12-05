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
        void ImportCards(ParseType parseType, string importString);
        void ClearCards();
    }

    public class AdminCardManager : IAdminCardManager
    {
        private CardContext _cardContext;

        public AdminCardManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public void ImportCards(ParseType parseType, string importString)
        {
            var parser = parseType.GetParser();
            if (string.IsNullOrEmpty(importString)) {
                importString = parser.Retrieve();
            }
            parser.Parse(importString);

            _cardContext.Cards.AddRange(parser.CardDtos);
            _cardContext.CardSetInfos.AddRange(parser.CardSetInfoDtos);
        }

        public void ClearCards()
        {
            _cardContext.CardSetInfos.RemoveRange(_cardContext.CardSetInfos);
        }
    }
}
