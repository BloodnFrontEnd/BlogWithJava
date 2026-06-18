export class ObjectHelper{
  static clearObject<T>(object: T): T {
    for (const item in object) {
      // @ts-ignore
      if (object.hasOwnProperty(item)) {
        if (typeof object[item] === 'string' && !object[item]) {
          delete object[item];
        }
        if (object[item] === null || object[item] === undefined) {
          delete object[item];
        }
      }
    }
    return object;
  }
}
