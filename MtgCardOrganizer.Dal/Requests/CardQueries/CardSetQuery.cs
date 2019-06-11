using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Requests.CardQueries
{
    public class CardSetQuery : AbstractCardQuery<CardSet>
    {
        public List<int> SetIds { get; set; } = new List<int>();
        public List<Rarity?> Rarities { get; set; } = new List<Rarity?>();
        public List<string> Nums { get; set; } = new List<string>();

        public override IQueryable<CardSet> ApplyQuery(IQueryable<CardSet> queryable)
        {
            queryable = ApplyIncludes(queryable);

            foreach (var part in Name) queryable = NameContains(queryable, part.ToLower());
            foreach (var part in Text) queryable = TextContains(queryable, part.ToLower());
            foreach (var part in Type) queryable = TypeContains(queryable, part.ToLower());            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            var nums = Nums.SelectMany(x => NumStrings(x)).ToList();
            if (SetIds.Any()) queryable = IsInSets(queryable, SetIds);
            if (Rarities.Any()) queryable = IsInRarities(queryable, Rarities);
            if (nums.Any()) queryable = IsInNums(queryable, nums);

            queryable = OrderResults(queryable);

            return queryable;
        }

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

        protected override IQueryable<CardSet> TextContains(IQueryable<CardSet> queryable, string substring)
        {
            return queryable.Where(x => x.Card.Text.ToLower().Contains(substring));
        }

        protected override IQueryable<CardSet> TypeContains(IQueryable<CardSet> queryable, string substring)
        {
            return queryable.Where(x => x.Card.Type.ToLower().Contains(substring));
        }


        // Card Set
        protected IQueryable<CardSet> IsInSets(IQueryable<CardSet> queryable, List<int> setIds)
        {
            return queryable.Where(x => setIds.Contains(x.SetId));
        }
        
        protected IQueryable<CardSet> IsInRarities(IQueryable<CardSet> queryable, List<Rarity?> rarities)
        {
            return queryable.Where(x => rarities.Contains(x.Rarity));
        }

        protected IQueryable<CardSet> IsInNums(IQueryable<CardSet> queryable, List<string> nums)
        {
            return queryable.Where(x => nums.Contains(x.Num));
        }
    }
}
