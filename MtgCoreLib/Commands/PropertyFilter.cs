using System.Collections.Generic;

public class PropertyFilter {
    public string Property { get; set; }
    public PropertyFilterOperator Operator { get; set; }
    public object Value { get; set; }
}

public enum PropertyFilterOperator {
    IsEqual,
}

public static class PropertyFilterOperatorHelper {
    public static bool TryParse(string s, out PropertyFilterOperator propertyFilterOperator) {
        propertyFilterOperator = PropertyFilterOperator.IsEqual;

        switch (s) {
            case "eq":
                propertyFilterOperator = PropertyFilterOperator.IsEqual;
                break;
            default:
                return false;
        }

        return true;
    }
}
