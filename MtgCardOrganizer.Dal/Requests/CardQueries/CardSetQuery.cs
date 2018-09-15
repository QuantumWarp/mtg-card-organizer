using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Requests.CardQueries
{
    public class CardSetQuery : AbstractCardQuery<CardSet>
    {
        protected override IQueryable<CardSet> ApplyIncludes(IQueryable<CardSet> queryable)
        {
            return queryable
                .Include(x => x.Card)
                .Include(x => x.CardInstances);
        }
        
        protected override IQueryable<CardSet> OrderResults(IQueryable<CardSet> queryable)
        {
            return queryable.OrderBy(x => x.Card.Name);
        }

        // Card
        protected override IQueryable<CardSet> NameContains(IQueryable<CardSet> queryable, string substring)
        {
            return queryable.Where(x => x.Card.Name.ToLower().Contains(substring));
        }

        protected override IQueryable<CardSet> OracleTextContains(IQueryable<CardSet> queryable, string substring)
        {
            return queryable.Where(x => x.Card.OracleText.ToLower().Contains(substring));
        }

        protected override IQueryable<CardSet> TypeContains(IQueryable<CardSet> queryable, string substring)
        {
            return queryable.Where(x => x.Card.Type.ToLower().Contains(substring));
        }


        // Card Set
        protected override IQueryable<CardSet> IsInSets(IQueryable<CardSet> queryable, List<int> setIds)
        {
            return queryable.Where(x => setIds.Contains(x.SetId));
        }
        
        protected override IQueryable<CardSet> IsInRarities(IQueryable<CardSet> queryable, List<Rarity> rarities)
        {
            return queryable.Where(x => rarities.Contains(x.Rarity));
        }

        protected override IQueryable<CardSet> IsInNums(IQueryable<CardSet> queryable, List<string> nums)
        {
            return queryable.Where(x => nums.Contains(x.Num));
        }

        // Card Instance
        protected override IQueryable<CardSet> IsInCollections(IQueryable<CardSet> queryable, List<int> collectionIds)
        {
            return queryable.Where(x => x.CardInstances.Any(y => collectionIds.Contains(y.CollectionId)));
        }
    }
}
