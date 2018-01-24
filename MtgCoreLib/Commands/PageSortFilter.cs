using System.Collections.Generic;

public class PageSortFilter {
    public PropertySort Sort { get; set; } = null;
    public IEnumerable<PropertyFilter> Filters { get; set; } = new List<PropertyFilter>();
    public int Offset { get; set; } = 0;
    public int? Limit { get; set; } = 10;
}