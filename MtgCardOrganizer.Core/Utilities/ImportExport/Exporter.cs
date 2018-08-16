using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Repositories;
using MtgCardOrganizer.Core.Requests;
using MtgCardOrganizer.Core.Requests.Generic;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class Exporter
    {
        private CollectionRepository _collectionRepository;
        private SetRepository _setRepository;

        private List<Set> _sets;

        public Exporter(CollectionRepository collectionRepository, SetRepository setRepository) {
            _collectionRepository = collectionRepository;
            _setRepository = setRepository;
        }

        public async Task<string> ConstructExport(int collectionId) {
            _sets = await _setRepository.GetSetsAsync();
            var collection = await _collectionRepository.GetAsync(collectionId);       
            return JsonConvert.SerializeObject(this.ConstructExportModel(collection), Formatting.Indented);        
        }

        private async Task<CollectionExportModel> ConstructExportModel(Collection collection) {
            var model = new CollectionExportModel();
            model.Name = collection.Name;

            var cardDetailsDtos = await _collectionRepository.GetCardsAsync(collection.Id, new CardQuery());
            model.Cards = cardDetailsDtos.Data.Select(x => {
                var card = new CardInstanceExportModel();
                card.Name = x.CardSet.Card.Name;
                card.SetName = _sets.Single(set => set == x.CardSet.Set).Name;
                card.Num = x.CardSet.Num;
                card.Foil = x.Foil;
                card.Promo = x.Promo;
                return card;
            }).ToList();
      
            return model;
        }
    }
}
