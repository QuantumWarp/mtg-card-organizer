using System;
using System.Linq;

namespace MtgCardOrganizer.Core.Utilities.General
{
    public interface IQuery<T>
    {
        IQueryable<S> ApplyQuery<S>(IQueryable<S> queryable, Func<S, T> transform);
    }
}
