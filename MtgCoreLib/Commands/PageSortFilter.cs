public class PageSortFilter {
    public PropertySort Sort { get; set; }
    public PropertyFilter Filter { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; } = 10;
}