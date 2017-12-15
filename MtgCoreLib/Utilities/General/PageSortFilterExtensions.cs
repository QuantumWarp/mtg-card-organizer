using System.Linq;

public static class PageSortFilterExtensions {
    public static IQueryable<T> ApplyPageSortFilter<T>(this IQueryable<T> queryable, PageSortFilter pageSortFilter) {
        return queryable
            .ApplyFilter(pageSortFilter.Filter)
            .ApplySorting(pageSortFilter.Sort)
            .ApplyPaging(pageSortFilter.Page, pageSortFilter.PageSize);
    }

    private static IQueryable<T> ApplyFilter<T>(this IQueryable<T> queryable, PropertyFilter filter) {
        return queryable; // TODO
    }

    private static IQueryable<T> ApplySorting<T>(this IQueryable<T> queryable, PropertySort sort) {
        return queryable; // TODO
    }

    private static IQueryable<T> ApplyPaging<T>(this IQueryable<T> queryable, int pageNo, int pageSize) {
        return queryable.Skip(pageNo * pageSize).Take(pageSize);
    }
}
