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
    public class ManaCostQuery // : IQuery<CardSet>
    {
        public bool Exclusive { get; set; }
        public bool OnlyMulticolor { get; set; }
        public List<Color> Color { get; set; } = new List<Color>();
        
        public IQueryable<T> ApplyQuery<T>(IQueryable<T> queryable, Expression<Func<T, CardSet>> transform)
        {
            // TODO

            return queryable;
        }
    }
}
