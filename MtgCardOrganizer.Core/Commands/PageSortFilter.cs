using System.Collections.Generic;

public class QueryModel<TDto> {
    public int Offset { get; set; } = 0;
    public int? Limit { get; set; } = null;
    public PropertySort<TDto> Sort { get; set; } = null;
    public IEnumerable<PropertyFilter<TDto>> Filters { get; set; } = new List<PropertyFilter<TDto>>();
}