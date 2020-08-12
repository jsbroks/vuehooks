export function isObject(a: unknown): boolean {
  return a && typeof a === 'object' && !Array.isArray(a)
}

function stableStringifyReplacer(_key: string, value: any): unknown {
  if (typeof value === 'function') {
    throw new Error('Cannot stringify non JSON value')
  }

  if (isObject(value)) {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        result[key] = value[key]
        return result
      }, {} as any)
  }

  return value
}

export function stableStringify(value: any): string {
  return JSON.stringify(value, stableStringifyReplacer)
}
