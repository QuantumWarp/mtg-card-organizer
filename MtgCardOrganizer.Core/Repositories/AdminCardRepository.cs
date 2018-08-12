using System.Threading.Tasks;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Utilities.Parsers;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface IAdminCardRepository
    {
        Task ImportCardsAsync(ImportRequest importRequest);
        void ClearCards();
    }

    public class AdminCardRepository : IAdminCardRepository
    {
        private MtgCardOrganizerContext _dbContext;

        public AdminCardRepository(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task ImportCardsAsync(ImportRequest importRequest)
        {
            var parser = importRequest.ParseType.GetParser();
            if (string.IsNullOrEmpty(importRequest.ImportString)) {
                importRequest.ImportString = parser.Retrieve();
            }
            parser.Parse(importRequest.ImportString);

            using (var transaction = await _dbContext.Database.BeginTransactionAsync()) {
                await _dbContext.Sets.AddRangeAsync(parser.Sets);
                await _dbContext.SaveChangesAsync();

                await _dbContext.Cards.AddRangeAsync(parser.Cards);
                await _dbContext.SaveChangesAsync();

                await _dbContext.CardSets.AddRangeAsync(parser.CardSets);
                await _dbContext.SaveChangesAsync();
                
                transaction.Commit();
            }
        }

        public void ClearCards()
        {
            _dbContext.CardSets.RemoveRange(_dbContext.CardSets);
        }
    }
}
