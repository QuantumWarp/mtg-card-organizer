using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Initialization;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class Importer
    {
        private MtgCardOrganizerContext _dbContext;

        private List<Set> _sets;
        private List<CardSet> _cardSets;
        
        public Importer(MtgCardOrganizerContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task ProcessImportAsync(string serializedExport, Container container)
        {
            _sets = await _dbContext.Sets.ToListAsync();
            var model = JsonConvert.DeserializeObject<CollectionExportModel>(serializedExport);
            _cardSets = await GetRelevantCardSetsAsync(model);

            ProcessCollection(model, container);
            await _dbContext.SaveChangesAsync();
        }

        private async Task<List<CardSet>> GetRelevantCardSetsAsync(CollectionExportModel model)
        {
            var names = model.Cards.Select(x => x.Name).ToList();

            return await _dbContext.CardSets
                .Include(x => x.Card)
                .Where(x => names.Contains(x.Card.Name))
                .ToListAsync();
        }

        private Func<CardSet, Boolean> GetCondition(CardInstanceExportModel cardInstanceExportModel)
        {
            var possibleSets = _sets.Where(set => set.Name.ToLower() == cardInstanceExportModel.SetName.ToLower());
            return x => x.Card.Name.ToLower() == cardInstanceExportModel.Name.ToLower() &&
                possibleSets.Contains(x.Set) &&
                (x.Num == null || x.Num == cardInstanceExportModel.Num || x.Num == cardInstanceExportModel.Num + "a");
        }

        private void ProcessCollection(CollectionExportModel collection, Container container) {
            var collectionEntity = new Collection() {
                Name = collection.Name,
                Container = container,
            };

            _dbContext.Collections.Add(collectionEntity);

            foreach (var card in collection.Cards) {
                ProcessCard(card, collectionEntity);
            }
        }

        private void ProcessCard(CardInstanceExportModel cardInstanceExportModel, Collection collection) {

            var possibleCardSets = _cardSets.Where(GetCondition(cardInstanceExportModel));
            var cardSet = possibleCardSets.FirstOrDefault();

            var cardInstance = new CardInstance() {
                Foil = cardInstanceExportModel.Foil,
                Promo = cardInstanceExportModel.Promo,
                CardSet = cardSet,
            };

            _dbContext.CardInstances.Add(cardInstance);
        }
    }
}
