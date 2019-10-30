using System.Collections.Generic;
using System.Linq;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Dal.Requests.CardQueries
{
    public class CardQuery : AbstractCardQuery<Card>
    {
        public List<string> FullNames { get; set; } = new List<string>();

        public override IQueryable<Card> ApplyQuery(IQueryable<Card> queryable)
        {
            if (FullNames.Count() > 0) queryable = queryable.Where(x => FullNames.Contains(x.Name));
            foreach (var part in Name) queryable = NameContains(queryable, part.ToLower());
            foreach (var part in Text) queryable = TextContains(queryable, part.ToLower());
            foreach (var part in Type) queryable = TypeContains(queryable, part.ToLower());            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            return queryable;
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
