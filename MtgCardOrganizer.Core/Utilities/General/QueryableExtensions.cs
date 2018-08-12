using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Responses;

namespace MtgCardOrganizer.Core.Utilities.General
{
    public static class PageSortFilterExtensions
    {
        public static async Task<PagedData<T>> ApplyQueryModelAsync<T>(this IQueryable<T> queryable, QueryModel<T> queryModel, PropertySort<T> defaultSort = null) {
            queryable = queryable.ApplyFilters(queryModel.Filters);
            queryable = queryable.ApplySorting(queryModel.Sort, defaultSort);
            return await queryable.ApplyPagingAsync(queryModel.Paging);
        }

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
            return query.ApplyQuery(queryable, x => x);
        }

        public static IQueryable<T> ApplyQuery<T, TFilterType>(this IQueryable<T> queryable, IQuery<TFilterType> query, Expression<Func<T, TFilterType>> transform)
        {
            if (query == null) return queryable;
            return query.ApplyQuery(queryable, transform);
        }

        private static IQueryable<T> ApplyFilters<T>(this IQueryable<T> queryable, IEnumerable<PropertyFilter<T>> filters) {
            foreach (var filter in filters) {
                queryable = queryable.ApplyFilter(filter);
            }
            return queryable;
        }

        private static IQueryable<T> ApplySorting<T>(this IQueryable<T> queryable, PropertySort<T> sort, PropertySort<T> defaultSort = null) {
            if (sort == null && defaultSort == null) return queryable;
            sort = sort != null ? sort : defaultSort;
            if (sort.Ascending) {
                return queryable.OrderBy(ExpressionHelper.CreateKeySelectorExpression<T>(sort));
            } else {
                return queryable.OrderByDescending(ExpressionHelper.CreateKeySelectorExpression<T>(sort));
            }
        }

        private static IQueryable<T> ApplyOffset<T>(this IQueryable<T> queryable, int offset) {
            return queryable.Skip(offset);
        }
        
        private static IQueryable<T> ApplyLimit<T>(this IQueryable<T> queryable, int? limit) {
            return limit.HasValue ? queryable.Take(limit.Value) : queryable;
        }

        private static IQueryable<T> ApplyFilter<T>(this IQueryable<T> queryable, PropertyFilter<T> filter) {
            var expression = ExpressionHelper.CreateFilterExpression<T>(filter);
            return queryable.Where(expression);
        }
    }
}
