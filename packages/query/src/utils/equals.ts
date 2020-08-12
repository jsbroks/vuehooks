export function deepEqual(a: any, b: any) {
  return equal(a, b, true)
}

// This deep-equal is directly based on https://github.com/epoberezkin/fast-deep-equal.
// The parts for comparing any non-JSON-supported values has been removed
export function equal(a: any, b: any, deep: boolean, depth = 0): boolean {
  if (a === b) return true

  if (
    (deep || !depth) &&
    a &&
    b &&
    typeof a == 'object' &&
    typeof b == 'object'
  ) {
    let length, i
    if (Array.isArray(a)) {
      length = a.length
      // eslint-disable-next-line eqeqeq
      if (length != b.length) return false
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i], deep, depth + 1)) return false
      return true
    }

    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf()

    const keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false

    for (i = length; i-- !== 0; ) {
      const key = keys[i]

      if (!equal(a[key], b[key], deep, depth + 1)) return false
    }

    return true
  }

  // true if both NaN, false otherwise
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b
}
