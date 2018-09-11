using System;
using System.Linq;
using System.Linq.Expressions;

namespace MtgCardOrganizer.Core.Utilities.General
{
    public interface IQuery<T>
    {
        IQueryable<T> ApplyQuery(IQueryable<T> queryable);
    }
}
