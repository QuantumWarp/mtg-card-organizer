using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Containers;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Requests.CardQueries;
using MtgCardOrganizer.Dal.Requests.Generic;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class Exporter
    {
        private ISetRepository _setRepository;
        
        private IContainerRepository _containerRepository;
        private ICollectionRepository _collectionRepository;
        private ICollectionCardQueryRepository _collectionCardQueryRepository;
        private IDeckRepository _deckRepository;

        private List<Set> _sets;

        public Exporter(
            IContainerRepository containerRepository,
            ICollectionRepository collectionRepository,
            ICollectionCardQueryRepository collectionCardQueryRepository,
            IDeckRepository deckRepository,
            ISetRepository setRepository)
        {
            _setRepository = setRepository;
            _containerRepository = containerRepository;        
            _collectionRepository = collectionRepository;
            _collectionCardQueryRepository = collectionCardQueryRepository;
            _deckRepository = deckRepository;
        }

        public async Task<string> GetExportStringAsync(int containerId) {
            _sets = await _setRepository.GetSetsAsync();
            var container = await _containerRepository.GetAsync(containerId);
            var exportModel = await this.ConstructExportModelAsync(container, true);     
            return JsonConvert.SerializeObject(exportModel, Formatting.Indented);        
        }

        private async Task<ContainerExportModel> ConstructExportModelAsync(Container container, bool firstIteration = false) {
            var containerModel = firstIteration ? new ContainerExportModel() : new ContainerExportModel(container);

            foreach (var subContainer in container.SubContainers)
            {
                var fullSubContainer = await _containerRepository.GetAsync(subContainer.Id);
                var subContainerModel = await ConstructExportModelAsync(fullSubContainer);
                containerModel.SubContainers.Add(subContainerModel);
            }

            foreach (var collection in container.Collections)
            {
                var collectionModel = new CollectionExportModel(collection);
                var cardInstances = await _collectionCardQueryRepository.GetInstancesAsync(new CardInstanceQuery {
                    CollectionIds = new List<int> { collection.Id },
                    Paging = new Paging()
                });
                collectionModel.Cards = cardInstances.Data.Select(x => new CardInstanceExportModel(x, _sets)).ToList();
                containerModel.Collections.Add(collectionModel);
            }
            
            foreach (var deck in container.Decks)
            {
                var deckModel = new DeckExportModel(deck);
                containerModel.Decks.Add(deckModel);
            }

            return containerModel;
        }
    }
}
