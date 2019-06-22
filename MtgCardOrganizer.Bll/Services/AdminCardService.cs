using MtgCardOrganizer.Bll.Parsers;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using System.Linq;
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

            var currentSets = await _setRepository.GetSetsAsync();
            var newSets = parser.Sets.Where(x =>
               !currentSets.Any(y => y.Name == x.Name) &&
               !currentSets.Any(y => y.Code == x.Code)).ToList();

            // Assumption - no new CardSets in existing sets
            var newCardSets = parser.CardSets.Where(x =>
               newSets.Any(y => y.Id == x.SetId)).ToList();

            var existingCards = (await _cardRepository.GetCardsAsync(new CardQuery {
                Paging = new Paging(),
                FullNames = parser.Cards.Select(x => x.Name).ToList(),
            })).Data.ToList();

            newCardSets.ForEach((cardSet) => {
                var existingCard = existingCards.FirstOrDefault(x => x.Name == cardSet.Card.Name);
                cardSet.Card = existingCard ?? cardSet.Card;
            });

            var existingCardNames = existingCards.Select(x => x.Name).ToList();
            var newCards = parser.Cards.Where(x => !existingCardNames.Contains(x.Name)).ToList();

            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                await _setRepository.CreateManyAsync(newSets);
                await _cardRepository.CreateManyAsync(newCards);
                await _cardSetRepository.CreateManyAsync(newCardSets);
                transaction.Commit();
            }
        }
    }
}
