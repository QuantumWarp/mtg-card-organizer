using System;
using System.Linq;
using System.Linq.Expressions;

namespace MtgCardOrganizer.Core.Utilities.General
{
    public interface IQuery<T>
    {
        IQueryable<S> ApplyQuery<S>(IQueryable<S> queryable, Expression<Func<S, T>> transform);
    }
}
