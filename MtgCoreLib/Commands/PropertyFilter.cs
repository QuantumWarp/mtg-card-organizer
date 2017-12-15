using System.Collections.Generic;

public class PropertyFilter {
    public string Property { get; set; }
    public string Operator { get; set; }
    public string Value { get; set; }
    public List<PropertyFilter> SubFilters { get; set; } = new List<PropertyFilter>();
}
