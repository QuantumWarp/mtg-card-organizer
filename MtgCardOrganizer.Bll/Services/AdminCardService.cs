using MtgCardOrganizer.Bll.Parsers;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Bll.Services
{
    public interface IAdminCardService
    {
        Task ImportCardsAsync(AdminImportRequest importRequest);
    }

    internal class AdminCardService : IAdminCardService
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly ISetRepository _setRepository;
        private readonly ICardRepository _cardRepository;
        private readonly ICardSetRepository _cardSetRepository;

        public AdminCardService(
            MtgCardOrganizerContext dbContext,
            ISetRepository setRepository,
            ICardRepository cardRepository,
            ICardSetRepository cardSetRepository)
        {
            _dbContext = dbContext;
            _setRepository = setRepository;
            _cardRepository = cardRepository;
            _cardSetRepository = cardSetRepository;
        }

        public async Task ImportCardsAsync(AdminImportRequest importRequest)
        {
            var parser = importRequest.ParseType.GetParser();
            if (string.IsNullOrEmpty(importRequest.ImportString)) {
                importRequest.ImportString = parser.Retrieve();
            }
            parser.Parse(importRequest.ImportString);

            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                await _setRepository.CreateManyAsync(parser.Sets);
                await _cardRepository.CreateManyAsync(parser.Cards);
                await _cardSetRepository.CreateManyAsync(parser.CardSets);
                transaction.Commit();
            }
        }
    }
}
