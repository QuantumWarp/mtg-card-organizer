using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Enums;

namespace MtgCardOrganizer.Core.Requests.CardQueries
{
    public class CardQuery : AbstractCardQuery<Card>
    {
        protected override IQueryable<Card> ApplyIncludes(IQueryable<Card> queryable)
        {
            return queryable
                .Include(x => x.CardSets)
                    .ThenInclude(x => x.CardInstances);
        }
        
        protected override IQueryable<Card> OrderResults(IQueryable<Card> queryable)
        {
            return queryable.OrderBy(x => x.Name);
        }

        // Card
        protected override IQueryable<Card> NameContains(IQueryable<Card> queryable, string substring)
        {
            return queryable.Where(x => x.Name.ToLower().Contains(substring));
        }

        protected override IQueryable<Card> OracleTextContains(IQueryable<Card> queryable, string substring)
        {
            return queryable.Where(x => x.OracleText.ToLower().Contains(substring));
        }

        protected override IQueryable<Card> TypeContains(IQueryable<Card> queryable, string substring)
        {
            return queryable.Where(x => x.Type.ToLower().Contains(substring));
        }

        // Card Set
        protected override IQueryable<Card> IsInSets(IQueryable<Card> queryable, List<int> setIds)
        {
            return queryable.Where(x => x.CardSets.Any(y => setIds.Contains(y.SetId)));
        }
        
        protected override IQueryable<Card> IsInRarities(IQueryable<Card> queryable, List<Rarity> rarities)
        {
            return queryable.Where(x => x.CardSets.Any(y => rarities.Contains(y.Rarity)));
        }

        protected override IQueryable<Card> IsInNums(IQueryable<Card> queryable, List<string> nums)
        {
            return queryable.Where(x => x.CardSets.Any(y => nums.Contains(y.Num)));
        }

        // Card Instance
        protected override IQueryable<Card> IsInCollections(IQueryable<Card> queryable, List<int> collectionIds)
        {
            return queryable.Where(x => x.CardSets.Any(y => y.CardInstances.Any(z => collectionIds.Contains(z.CollectionId))));
        }
    }
}
