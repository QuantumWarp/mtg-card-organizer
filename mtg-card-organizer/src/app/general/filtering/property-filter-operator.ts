export enum PropertyFilterOperator {
  IsEqual,
  Contains,
  IsContainedIn,
}

export class PropertyFilterOperatorExtensions {
  static toQueryStringOperator(filterOperator: PropertyFilterOperator): string {
    switch (filterOperator) {
      case PropertyFilterOperator.IsEqual: return 'eq';
      case PropertyFilterOperator.Contains: return 'con';
      case PropertyFilterOperator.IsContainedIn: return 'in';
      default: throw new Error('Unknown PropertyFilterOperator');
    }
  }
}
