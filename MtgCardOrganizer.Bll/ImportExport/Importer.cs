using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class Importer
    {
        private ISetRepository _setRepository;

        private IContainerRepository _containerRepository;
        private ICollectionRepository _collectionRepository;
        private ICardSetRepository _cardSetRepository;
        private IDeckRepository _deckRepository;

        private List<Set> _sets;
        
        public Importer(
            IContainerRepository containerRepository,
            ICollectionRepository collectionRepository,
            IDeckRepository deckRepository,
            ICardSetRepository cardSetRepository,
            ISetRepository setRepository)
        {
            _setRepository = setRepository;
            _containerRepository = containerRepository;
            _collectionRepository = collectionRepository;
            _cardSetRepository = cardSetRepository;
            _deckRepository = deckRepository;
        }

        public async Task ProcessImportAsync(int containerId, string serializedExport)
        {
            _sets = await _setRepository.GetSetsAsync();
            var containerModel = JsonConvert.DeserializeObject<ContainerExportModel>(serializedExport);
            var container = await _containerRepository.GetAsync(containerId);
            await DeconstructExportModelAsync(container, containerModel);
        }

        private async Task DeconstructExportModelAsync(Container parentContainer, ContainerExportModel containerModel)
        {
            foreach (var subContainerModel in containerModel.SubContainers)
            {
                var subContainer = subContainerModel.ToContainer(parentContainer);
                await _containerRepository.CreateAsync(subContainer);
                await DeconstructExportModelAsync(subContainer, subContainerModel);
            }

            foreach (var collectionModel in containerModel.Collections)
            {
                var collection = collectionModel.ToCollection(parentContainer);
                await _collectionRepository.CreateAsync(collection);

                var relevantCardSets = await GetRelevantCardSetsAsync(collectionModel);
                var cards = collectionModel.Cards.Select(x => x.ToCardInstance(collection, relevantCardSets, _sets));
                await _collectionRepository.AddCardsAsync(collection.Id, cards.ToList());
            }
            
            foreach (var deckModel in containerModel.Decks)
            {
                var deck = deckModel.ToDeck(parentContainer);
                await _deckRepository.CreateAsync(deck);
            }
        }

        private async Task<List<CardSet>> GetRelevantCardSetsAsync(CollectionExportModel collectionModel)
        {
            var names = collectionModel.Cards.Select(x => x.Name).ToList();
            return await _cardSetRepository.GetCardSetsByNameAsync(names);
        }
    }
}
