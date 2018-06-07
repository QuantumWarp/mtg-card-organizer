export interface IDeserializable<T> {
  deserialize(json: any): T;
}

export interface IGenericDeserializable<T, S> {
  deserialize(json: any, subDeserialize: (json: any) => S): T;
}

export class DeserializationHelper {
  toType<T>(json: any, type: new() => IDeserializable<T>): T {
    return new type().deserialize(json);
  }

  toGenericType<T, S>(json: any, type: new() => IGenericDeserializable<T, S>, genericType: new() => IDeserializable<S>): T {
    return new type().deserialize(json, (subJson) => new genericType().deserialize(subJson));
  }
}
