using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Enums;

namespace MtgCardOrganizer.Core.Requests.CardQueries
{
    public class CardInstanceQuery : AbstractCardQuery<CardInstance>
    {
        protected override IQueryable<CardInstance> ApplyIncludes(IQueryable<CardInstance> queryable)
        {
            return queryable
                .Include(x => x.CardSet)
                    .ThenInclude(x => x.Card);
        }     

        protected override IQueryable<CardInstance> OrderResults(IQueryable<CardInstance> queryable)
        {
            return queryable.OrderBy(x => x.CardSet.Card.Name);
        }
        
        // Card
        protected override IQueryable<CardInstance> NameContains(IQueryable<CardInstance> queryable, string substring)
        {
            return queryable.Where(x => x.CardSet.Card.Name.ToLower().Contains(substring));
        }

        protected override IQueryable<CardInstance> OracleTextContains(IQueryable<CardInstance> queryable, string substring)
        {
            return queryable.Where(x => x.CardSet.Card.OracleText.ToLower().Contains(substring));
        }

        protected override IQueryable<CardInstance> TypeContains(IQueryable<CardInstance> queryable, string substring)
        {
            return queryable.Where(x => x.CardSet.Card.Type.ToLower().Contains(substring));
        }

        // Card Set
        protected override IQueryable<CardInstance> IsInSets(IQueryable<CardInstance> queryable, List<int> setIds)
        {
            return queryable.Where(x => setIds.Contains(x.CardSet.SetId));
        }
        
        protected override IQueryable<CardInstance> IsInRarities(IQueryable<CardInstance> queryable, List<Rarity> rarities)
        {
            return queryable.Where(x => rarities.Contains(x.CardSet.Rarity));
        }

        protected override IQueryable<CardInstance> IsInNums(IQueryable<CardInstance> queryable, List<string> nums)
        {
            return queryable.Where(x => nums.Contains(x.CardSet.Num));
        }

        // Card Instance
        protected override IQueryable<CardInstance> IsInCollections(IQueryable<CardInstance> queryable, List<int> collectionIds)
        {
            return queryable.Where(x => collectionIds.Contains(x.CollectionId));
        }
    }
}
