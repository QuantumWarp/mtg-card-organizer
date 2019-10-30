using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Requests.CardQueries
{
    public class CardInstanceQuery : AbstractCardQuery<CardInstance>
    {
        public List<int> SetIds { get; set; } = new List<int>();
        public List<Rarity?> Rarities { get; set; } = new List<Rarity?>();
        public List<string> Nums { get; set; } = new List<string>();

        public int MinCount { get; set; } = 0;
        public List<int> CollectionIds { get; set; } = new List<int>();

        public override IQueryable<CardInstance> ApplyQuery(IQueryable<CardInstance> queryable)
        {
            foreach (var part in Name) queryable = NameContains(queryable, part.ToLower());
            foreach (var part in Text) queryable = TextContains(queryable, part.ToLower());
            foreach (var part in Type) queryable = TypeContains(queryable, part.ToLower());            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            var nums = Nums.SelectMany(x => NumStrings(x)).ToList();
            if (SetIds.Any()) queryable = IsInSets(queryable, SetIds);
            if (Rarities.Any()) queryable = IsInRarities(queryable, Rarities);
            if (nums.Any()) queryable = IsInNums(queryable, nums);

            if (CollectionIds.Any()) queryable = IsInCollections(queryable, CollectionIds);

            return queryable;
        }
        
        // Card
        protected override IQueryable<CardInstance> NameContains(IQueryable<CardInstance> queryable, string substring)
        {
            return queryable.Where(x => x.CardSet.Card.Name.ToLower().Contains(substring));
        }

        protected override IQueryable<CardInstance> TextContains(IQueryable<CardInstance> queryable, string substring)
        {
            return queryable.Where(x => x.CardSet.Card.Text.ToLower().Contains(substring));
        }

        protected override IQueryable<CardInstance> TypeContains(IQueryable<CardInstance> queryable, string substring)
        {
            return queryable.Where(x => x.CardSet.Card.Type.ToLower().Contains(substring));
        }

        // Card Set
        protected IQueryable<CardInstance> IsInSets(IQueryable<CardInstance> queryable, List<int> setIds)
        {
            return queryable.Where(x => setIds.Contains(x.CardSet.SetId));
        }
        
        protected IQueryable<CardInstance> IsInRarities(IQueryable<CardInstance> queryable, List<Rarity?> rarities)
        {
            return queryable.Where(x => rarities.Contains(x.CardSet.Rarity));
        }

        protected IQueryable<CardInstance> IsInNums(IQueryable<CardInstance> queryable, List<string> nums)
        {
            return queryable.Where(x => nums.Contains(x.CardSet.Num));
        }

        // Card Instance
        protected IQueryable<CardInstance> IsInCollections(IQueryable<CardInstance> queryable, List<int> collectionIds)
        {
            return queryable.Where(x => collectionIds.Contains(x.CollectionId));
        }
    }
}
