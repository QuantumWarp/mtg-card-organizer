using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MtgCardOrganizer.Dal.Entities.Cards;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Utilities.General;

namespace MtgCardOrganizer.Dal.Requests
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
