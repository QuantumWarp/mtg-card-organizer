using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Requests.CardQueries
{
    public class CardQuery : AbstractCardQuery<Card>
    {
        public override IQueryable<Card> ApplyQuery(IQueryable<Card> queryable)
        {
            queryable = ApplyIncludes(queryable);

            foreach (var part in Name) queryable = NameContains(queryable, part.ToLower());
            foreach (var part in Text) queryable = TextContains(queryable, part.ToLower());
            foreach (var part in Type) queryable = TypeContains(queryable, part.ToLower());            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            queryable = OrderResults(queryable);

            return queryable;
        }

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

        protected override IQueryable<Card> TextContains(IQueryable<Card> queryable, string substring)
        {
            return queryable.Where(x => x.Text.ToLower().Contains(substring));
        }

        protected override IQueryable<Card> TypeContains(IQueryable<Card> queryable, string substring)
        {
            return queryable.Where(x => x.Type.ToLower().Contains(substring));
        }
    }
}
