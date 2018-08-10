using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Utilities.Parsers;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface IAdminCardRepository
    {
        void ImportCards(ImportRequest importRequest);
        void ClearCards();
    }

    public class AdminCardRepository : IAdminCardRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public AdminCardRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void ImportCards(ImportRequest importRequest)
        {
            var parser = importRequest.ParseType.GetParser();
            if (string.IsNullOrEmpty(importRequest.ImportString)) {
                importRequest.ImportString = parser.Retrieve();
            }
            parser.Parse(importRequest.ImportString);

            using (var transaction = _dbContext.Database.BeginTransaction()) {
                _dbContext.Sets.AddRange(parser.Sets);
                _dbContext.SaveChanges();

                _dbContext.Cards.AddRange(parser.Cards);
                _dbContext.SaveChanges();

                _dbContext.CardSets.AddRange(parser.CardSetInfos);
                _dbContext.SaveChanges();
                
                transaction.Commit();
            }
        }

        public void ClearCards()
        {
            _dbContext.CardSets.RemoveRange(_dbContext.CardSets);
        }
    }
}
