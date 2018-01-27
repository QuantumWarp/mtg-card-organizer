using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MtgCoreLib.Dtos.Admin;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Initialization;
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
        private MtgCoreLibContext _dbContext;

        public AdminCardManager(MtgCoreLibContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void ImportCards(ImportCommand importCommand)
        {
            var parser = importCommand.ParseType.GetParser();
            if (string.IsNullOrEmpty(importCommand.ImportString)) {
                importCommand.ImportString = parser.Retrieve();
            }
            parser.Parse(importCommand.ImportString);

            using (var transaction = _dbContext.Database.BeginTransaction()) {
                var setDict = new Dictionary<SetDto, Set>();
                _dbContext.Sets.AddRange(parser.SetDtos.Select(setDto => {
                    var set = new Set(setDto);
                    setDict.Add(setDto, set);
                    return set;
                }));
                _dbContext.SaveChanges();

                var cardDict = new Dictionary<CardDto, Card>();
                _dbContext.Cards.AddRange(parser.CardDtos.Select(cardDto => {
                    var card = new Card(cardDto);
                    cardDict.Add(cardDto, card);
                    return card;
                }));
                _dbContext.SaveChanges();

                _dbContext.CardSetInfos.AddRange(parser.CardSetInfoDtos.Select(x => {
                    return new CardSetInfo(setDict[parser.SetRelationship[x]], cardDict[parser.CardRelationship[x]], x);
                }));
                _dbContext.SaveChanges();
                
                transaction.Commit();
            }
        }

        public void ClearCards()
        {
            _dbContext.CardSetInfos.RemoveRange(_dbContext.CardSetInfos);
        }
    }
}
