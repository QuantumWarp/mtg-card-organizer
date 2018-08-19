using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Entities.Containers;
using MtgCardOrganizer.Core.Initialization;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class Importer
    {
        private MtgCardOrganizerContext _dbContext;

        private List<Set> _sets;
        
        public Importer(MtgCardOrganizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task ProcessImportAsync(int containerId, string serializedExport)
        {
            _sets = await _dbContext.Sets.ToListAsync();
            var containerModel = JsonConvert.DeserializeObject<ContainerExportModel>(serializedExport);
            var container = await _dbContext.Containers.FindAsync(containerId);
            await DeconstructExportModelAsync(container, containerModel);
            await _dbContext.SaveChangesAsync();
        }

        private async Task DeconstructExportModelAsync(Container parentContainer, ContainerExportModel containerModel)
        {
            foreach (var subContainerModel in containerModel.SubContainers)
            {
                var subContainer = subContainerModel.ToContainer(parentContainer);
                await _dbContext.Containers.AddAsync(subContainer);
                await DeconstructExportModelAsync(subContainer, subContainerModel);
            }

            foreach (var collectionModel in containerModel.Collections)
            {
                var collection = collectionModel.ToCollection();
                await _dbContext.Collections.AddAsync(collection);

                var relevantCardSets = await GetRelevantCardSetsAsync(collectionModel);
                var cards = collectionModel.Cards.Select(x => x.ToCardInstance(collection, relevantCardSets, _sets));
                await _dbContext.CardInstances.AddRangeAsync(cards);
            }
            
            foreach (var deckModel in containerModel.Decks)
            {
                var deck = deckModel.ToDeck();
                await _dbContext.Decks.AddAsync(deck);
            }
        }

        private async Task<List<CardSet>> GetRelevantCardSetsAsync(CollectionExportModel collectionModel)
        {
            var names = collectionModel.Cards.Select(x => x.Name).ToList();

            return await _dbContext.CardSets
                .Include(x => x.Card)
                .Where(x => names.Contains(x.Card.Name))
                .ToListAsync();
        }
    }
}
