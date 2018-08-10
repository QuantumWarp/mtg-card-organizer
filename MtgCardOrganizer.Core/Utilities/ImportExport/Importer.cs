using System;
using System.Collections.Generic;
using System.Linq;
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
        
        public Importer(MtgCardOrganizerContext dbContext) {
            _dbContext = dbContext;
        }

        public void ProcessImport(string serializedExport, Collection parentCollection, string userId) {
            using (var transaction = _dbContext.Database.BeginTransaction()) {
                _sets = _dbContext.Sets.ToList();
                var model = JsonConvert.DeserializeObject<CollectionExportModel>(serializedExport);
                ProcessCollection(model, parentCollection, userId);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
        }

        private void ProcessCollection(CollectionExportModel collection, Collection parentCollection, string userId) {
            var collectionEntity = new Collection() {
                Name = collection.Name,
                Parent = parentCollection,
                OwnerUserId = userId,
            };

            _dbContext.Collections.Add(collectionEntity);
            _dbContext.SaveChanges();

            foreach (var card in collection.Cards) {
                ProcessCard(card, collectionEntity);
            }

            foreach (var subCollection in collection.SubCollections) {
                ProcessCollection(subCollection, collectionEntity, userId);
            }
        }

        private void ProcessCard(CardInstanceExportModel card, Collection collection) {

            var possibleSets = _sets.Where(set => set.Name.ToLower() == card.SetName.ToLower());

            var cardSetInfoQueryable = _dbContext.CardSets
                .Include(x => x.Card)
                .Where(x => x.Card.Name.ToLower() == card.Name.ToLower())
                .Where(x => possibleSets.Contains(x.Set));

            CardSet cardSetInfo;
            if (!string.IsNullOrEmpty(card.Num)) {
                cardSetInfo = cardSetInfoQueryable.Where(x => x.Num == card.Num).FirstOrDefault();
                if (cardSetInfo == null) {
                    cardSetInfo = cardSetInfoQueryable.Where(x => x.Num == card.Num + "a").FirstOrDefault();
                }
            } else {
                cardSetInfo = cardSetInfoQueryable.SingleOrDefault();
            }

            if (cardSetInfo == null) {
                cardSetInfo = cardSetInfoQueryable.FirstOrDefault();
            }

            var cardInstance = new CardInstance() {
                Foil = card.Foil,
                Promo = card.Promo
            };

            _dbContext.CardInstances.Add(cardInstance);
            _dbContext.SaveChanges();

            _dbContext.CollectionCardLinks.Add(new CollectionCardLink() { 
                Collection = collection,
                CardInstance = cardInstance,
            });
        }
    }
}
