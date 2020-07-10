function isEqualByProps(a: Object, b: Object): boolean {

  if (a === b) {
    return true;
  }

  if (typeof a !== 'object' && typeof b !== 'object') {
    return false;
  }

  const aKeys = Object.keys(a) as (keyof typeof a)[];
  const bKeys = Object.keys(b) as (keyof typeof b)[];

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((aKey) => isEqualByProps(a[aKey], b[aKey]));

}
