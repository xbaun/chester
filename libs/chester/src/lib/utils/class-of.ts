export function classOf<T>(object: T) {
  return Object.getPrototypeOf(object).constructor;
}
