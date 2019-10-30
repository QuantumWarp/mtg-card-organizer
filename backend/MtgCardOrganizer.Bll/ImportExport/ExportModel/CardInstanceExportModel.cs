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
            var set = sets.Where(x => x.Name.ToLower() == SetName.ToLower()).FirstOrDefault();
            if (set == null) throw new Exception($"Set with name '{SetName}' not found");

            var cardsSetsInSet = cardSets.Where(x => set.Id == x.SetId);
            var possibleCardSets = cardsSetsInSet.Where(x => x.Card.Name.ToLower() == Name.ToLower());
            if (possibleCardSets.Count() == 0) throw new Exception($"Card with name '{Name}' not found in set '{SetName}'");

            var cardSet = possibleCardSets.FirstOrDefault(x => x.Num == Num);
            if (cardSet == null) throw new Exception($"Card with name '{Name}' in set '{SetName}' had invalid num '{Num}'");
            
            return new CardInstance {
                Foil = Foil,
                Promo = Promo,
                CardSetId = cardSet.Id,
                CollectionId = collection.Id,
            };
        }
    }
}
