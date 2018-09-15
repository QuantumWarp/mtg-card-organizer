using System;
using System.Collections.Generic;
using System.Linq;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Entities.Collections;

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
            this.Name = cardInstance.CardSet.Card.Name;
            this.SetName = sets.First(x => x.Id == cardInstance.CardSet.SetId).Name;
            this.Num = cardInstance.CardSet.Num;
            this.Foil = cardInstance.Foil;
            this.Promo = cardInstance.Promo;
        }

        public CardInstance ToCardInstance(Collection collection, List<CardSet> cardSets, List<Set> sets)
        {
            var possibleCardSets = cardSets.Where(GetCondition(sets));
            var cardSet = possibleCardSets.FirstOrDefault();

            return new CardInstance {
                Foil = Foil,
                Promo = Promo,
                CardSet = cardSet,
                Collection = collection,
            };
        }
        
        private Func<CardSet, Boolean> GetCondition(List<Set> sets)
        {
            var possibleSets = sets.Where(set => set.Name.ToLower() == SetName.ToLower());
            return x => x.Card.Name.ToLower() == Name.ToLower() &&
                possibleSets.Contains(x.Set) &&
                (x.Num == null || x.Num == Num || x.Num == Num + "a");
        }
    }
}
