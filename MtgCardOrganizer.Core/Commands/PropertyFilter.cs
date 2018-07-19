using System.Collections.Generic;

public class PropertyFilter<T> {
    public string Property { get; set; }
    public PropertyFilterOperator Operator { get; set; }
    public object Value { get; set; }
}

public enum PropertyFilterOperator {
    Contains,
    IsEqual,
    IsContainedIn,
}

public static class PropertyFilterOperatorHelper {
    public static bool TryParse(string s, out PropertyFilterOperator propertyFilterOperator) {
        propertyFilterOperator = PropertyFilterOperator.IsEqual;

        switch (s) {
            case "eq":
                propertyFilterOperator = PropertyFilterOperator.IsEqual;
                break;
            case "con":
                propertyFilterOperator = PropertyFilterOperator.Contains;
                break;
            case "in":
                propertyFilterOperator = PropertyFilterOperator.IsContainedIn;
                break;
            default:
                return false;
        }

        return true;
    }
}
