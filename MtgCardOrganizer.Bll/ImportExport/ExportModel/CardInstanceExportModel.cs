using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Collections;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class CardInstanceExportModel
    {
        public string Name { get; set; }
        public string SetName { get; set; }
        public string Num { get; set; }
        public bool Foil { get; set; }
        public bool Promo { get; set; }

        public CardInstanceExportModel() { }
        public CardInstanceExportModel(CardInstance cardInstance, List<Set> sets)
        {
            Name = cardInstance.CardSet.Card.Name;
            SetName = sets.First(x => x.Id == cardInstance.CardSet.SetId).Name;
            Num = cardInstance.CardSet.Num;
            Foil = cardInstance.Foil;
            Promo = cardInstance.Promo;
        }

        public CardInstance ToCardInstance(Collection collection, List<CardSet> cardSets, List<Set> sets)
        {
            var possibleCardSets = cardSets.Where(GetCondition(sets));
            var cardSet = possibleCardSets.First();

            return new CardInstance {
                Foil = Foil,
                Promo = Promo,
                CardSetId = cardSet.Id,
                CollectionId = collection.Id,
            };
        }
        
        private Func<CardSet, Boolean> GetCondition(List<Set> sets)
        {
            var possibleSetIds = sets
                .Where(set => set.Name.ToLower() == SetName.ToLower())
                .Select(x => x.Id);
            return x => x.Card.Name.ToLower() == Name.ToLower() &&
                possibleSetIds.Contains(x.SetId) &&
                (x.Num == null || x.Num == Num || x.Num == Num + "a");
        }
    }
}
