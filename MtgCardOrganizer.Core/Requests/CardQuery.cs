using System;
using System.Linq;
using System.Linq.Expressions;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Requests
{
    public class CardQuery : IQuery<CardSet>
    {
        public Paging Paging { get; set; }

        public string Name { get; set; }
        public string Text { get; set; }

        public IQueryable<T> ApplyQuery<T>(IQueryable<T> queryable, Expression<Func<T, CardSet>> transform)
        {
            if (!string.IsNullOrWhiteSpace(Name))
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => x.Card.Name.ToLower().Contains(Name.ToLower())));
            if (!string.IsNullOrWhiteSpace(Text))
                queryable = queryable.Where(ExpressionHelper.Combine(transform, x => x.Card.Name.ToLower().Contains(Text.ToLower())));
            queryable = queryable.OrderBy(ExpressionHelper.Combine(transform, x => x.Card.Name));
            return queryable;
        }

    }
}
