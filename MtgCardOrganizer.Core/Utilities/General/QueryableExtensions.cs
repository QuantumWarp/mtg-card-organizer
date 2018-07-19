using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace MtgCoreLib.Utilities.General
{
    public static class PageSortFilterExtensions {
        public static PagedData<T> AsPagedData<T>(this IQueryable queryable, QueryModel<T> queryModel, PropertySort<T> defaultSort = null) {
            var typedQueryable = queryable.ProjectTo<T>(Mapper.Configuration);
            var results = typedQueryable.ApplyQueryModel(queryModel, out int totalCount, defaultSort).ToList();
            return new PagedData<T>(results, totalCount);
        }

        public static IQueryable<T> ApplyQueryModel<T>(this IQueryable<T> queryable, QueryModel<T> queryModel, out int totalCount, PropertySort<T> defaultSort = null) {
            queryable = queryable.ApplyFilters(queryModel.Filters);
            queryable = queryable.ApplySorting(queryModel.Sort, defaultSort);
            totalCount = queryable.Count();
            queryable = queryable.ApplyOffset(queryModel.Offset);
            queryable = queryable.ApplyLimit(queryModel.Limit);
            return queryable;
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
