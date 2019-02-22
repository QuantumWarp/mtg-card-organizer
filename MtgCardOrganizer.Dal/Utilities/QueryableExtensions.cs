using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Responses;

namespace MtgCardOrganizer.Dal.Utilities
{
    public static class PageSortFilterExtensions
    {
        public static async Task<PagedData<T>> ApplyPagingAsync<T>(this IQueryable<T> queryable, Paging paging)
        {
            paging = paging != null ? paging : new Paging() { Limit = 10 };
            var totalCount = queryable.Count();
            queryable = queryable.ApplyOffset(paging.Offset);
            queryable = queryable.ApplyLimit(paging.Limit);
            var data = await queryable.ToListAsync();
            return new PagedData<T>(data, totalCount);
        }

        public static IQueryable<T> ApplyQuery<T>(this IQueryable<T> queryable, IQuery<T> query)
        {
            if (query == null) return queryable;
            return query.ApplyQuery(queryable);
        }

        private static IQueryable<T> ApplyOffset<T>(this IQueryable<T> queryable, int offset) {
            return queryable.Skip(offset);
        }
        
        private static IQueryable<T> ApplyLimit<T>(this IQueryable<T> queryable, int? limit) {
            return limit.HasValue ? queryable.Take(limit.Value) : queryable;
        }

        public static IQueryable<T> ConditionalWhere<T>(this IQueryable<T> queryable, Expression<Func<T, bool>> predicate, bool condition)
        {
            if (condition) {
                return queryable.Where(predicate);
            } else {
                return queryable;
            }
        }
    }
}
