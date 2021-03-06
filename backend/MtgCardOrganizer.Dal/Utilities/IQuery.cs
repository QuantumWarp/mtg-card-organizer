using System;
using System.Linq;
using System.Linq.Expressions;

namespace MtgCardOrganizer.Dal.Utilities
{
    public interface IQuery<T>
    {
        IQueryable<T> ApplyQuery(IQueryable<T> queryable);
    }
}
