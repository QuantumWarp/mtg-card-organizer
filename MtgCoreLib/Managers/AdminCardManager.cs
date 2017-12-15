using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MtgCoreLib.Contexts;
using MtgCoreLib.Dtos.Admin;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Utilities.Parsers;

namespace MtgCoreLib.Managers
{
    public interface IAdminCardManager
    {
        void ImportCards(ImportCommand importCommand);
        void ClearCards();
    }

    public class AdminCardManager : IAdminCardManager
    {
        private CardContext _cardContext;

        public AdminCardManager(CardContext cardContext)
        {
            _cardContext = cardContext;
        }

        public void ImportCards(ImportCommand importCommand)
        {
            var parser = importCommand.ParseType.GetParser();
            if (string.IsNullOrEmpty(importCommand.ImportString)) {
                importCommand.ImportString = parser.Retrieve();
            }
            parser.Parse(importCommand.ImportString);

            using (var transaction = _cardContext.Database.BeginTransaction()) {
                var setDict = new Dictionary<SetDto, Set>();
                _cardContext.Sets.AddRange(parser.SetDtos.Select(setDto => {
                    var set = new Set(setDto);
                    setDict.Add(setDto, set);
                    return set;
                }));
                _cardContext.SaveChanges();

                var cardDict = new Dictionary<CardDto, Card>();
                _cardContext.Cards.AddRange(parser.CardDtos.Select(cardDto => {
                    var card = new Card(cardDto);
                    cardDict.Add(cardDto, card);
                    return card;
                }));
                _cardContext.SaveChanges();

                _cardContext.CardSetInfos.AddRange(parser.CardSetInfoDtos.Select(x => {
                    return new CardSetInfo(setDict[parser.SetRelationship[x]], cardDict[parser.CardRelationship[x]], x);
                }));
                _cardContext.SaveChanges();
                
                transaction.Commit();
            }
        }

        public void ClearCards()
        {
            _cardContext.CardSetInfos.RemoveRange(_cardContext.CardSetInfos);
        }
    }
}
