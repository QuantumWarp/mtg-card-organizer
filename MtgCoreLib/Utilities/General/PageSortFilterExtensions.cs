using System.Collections.Generic;
using System.Linq;

public static class PageSortFilterExtensions {
    public static IQueryable<T> ApplyPageSortFilter<T>(this IQueryable<T> queryable, PageSortFilter pageSortFilter) {
        return queryable
            .ApplyFilters(pageSortFilter.Filters)
            .ApplySorting(pageSortFilter.Sort)
            .ApplyOffset(pageSortFilter.Offset)
            .ApplyLimit(pageSortFilter.Limit);
    }

    private static IQueryable<T> ApplyFilters<T>(this IQueryable<T> queryable, IEnumerable<PropertyFilter> filters) {
        foreach (var filter in filters) {
            queryable.W
        }
        return queryable;
    }

    private static IQueryable<T> ApplySorting<T>(this IQueryable<T> queryable, PropertySort sort) {
        if (sort == null) return queryable;
        if (sort.Ascending) {
            return queryable.OrderBy();
        } else {
            return queryable.OrderByDescending();
        }
    }

    private static IQueryable<T> ApplyOffset<T>(this IQueryable<T> queryable, int offset) {
        return queryable.Skip(offset);
    }
    
    private static IQueryable<T> ApplyLimit<T>(this IQueryable<T> queryable, int? limit) {
        return limit.HasValue ? queryable.Take(limit.Value) : queryable;
    }

    private static IQueryable<T> ApplyFilter<T>(this IQueryable<T> queryable, PropertyFilter filter) {
        switch (filter.Operator) {
            case PropertyFilterOperator.IsEqual:
                return queryable.Where()
            default:
                return queryable;
        }
    }
}
