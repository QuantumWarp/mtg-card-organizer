export class ErrorModel {

  constructor(
    public message: string,
    public data?: any,
  ) { }

  static isErrorModel(obj: any): obj is ErrorModel {
    return !!obj['message'];
  }
}
