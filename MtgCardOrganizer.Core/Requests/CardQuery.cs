using System;
using System.Linq;
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

        public IQueryable<T> ApplyQuery<T>(IQueryable<T> queryable, Func<T, CardSet> transform)
        {
            if (!string.IsNullOrWhiteSpace(Name))
                queryable = queryable.Where(x => transform(x).Card.Name.Contains(Name));
            if (!string.IsNullOrWhiteSpace(Text))
                queryable = queryable.Where(x => transform(x).Card.Name.Contains(Text));
            return queryable;
        }
    }
}
