using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Enums;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Requests
{
    public class CardQuery : IQuery<CardSet>
    {
        public Paging Paging { get; set; }

        // public List<int> CollectionIds { get; set; } = new List<int>();
        public List<int> SetIds { get; set; } = new List<int>();

        public List<string> Name { get; set; } = new List<string>();
        public List<string> Text { get; set; } = new List<string>();
        public List<string> Type { get; set; } = new List<string>();
        public List<string> Num { get; set; } = new List<string>();
        public List<Rarity> Rarity { get; set; } = new List<Rarity>();

        public ManaCostQuery ManaCost { get; set; } = new ManaCostQuery();

        public IQueryable<T> ApplyQuery<T>(IQueryable<T> queryable, Expression<Func<T, CardSet>> transform)
        {
            if (SetIds.Any())
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => 
                    SetIds.Contains(x.SetId)));

            foreach (var part in Name)
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => 
                    x.Card.Name.ToLower().Contains(part.ToLower())));

            foreach (var part in Text)
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => 
                    x.Card.OracleText.ToLower().Contains(part.ToLower())));
                    
            foreach (var part in Type)
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => 
                    x.Card.Type.ToLower().Contains(part.ToLower())));

            foreach (var num in Num)
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => 
                    NumStrings(num).Contains(x.Num)));
            
            if (Rarity.Any())
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => 
                    Rarity.Contains(x.Rarity)));

            queryable = queryable.ApplyQuery(ManaCost, transform);

            queryable = queryable.OrderBy(ExpressionHelper.Combine(transform, x => x.Card.Name));

            return queryable;
        }

        private IEnumerable<string> NumStrings(string searchNum)
        {
            while (searchNum.Length < 4) 
                searchNum = "0" + searchNum;

            while (searchNum.StartsWith("0"))
            {
                yield return searchNum;
                searchNum = searchNum.Substring(1);
            }

            yield return searchNum;
        }
    }
}
