import { stableStringify } from './utils'

export type QueryKeyObject =
  | object
  | { [key: string]: QueryKey }
  | { [key: number]: QueryKey }
export type QueryKeyPrimitive = string | boolean | number | null | undefined
export type QueryKeyArray = readonly QueryKey[]
export type QueryKey = QueryKeyObject | QueryKeyArray | QueryKeyPrimitive

export type QueryKeySerializerFunction = (
  key: QueryKey
) => [string, QueryKeyArray]

export const defaultQueryKeySerializerFn: QueryKeySerializerFunction = (
  key: QueryKey
) => {
  try {
    let arrayQueryKey: QueryKeyArray = Array.isArray(key) ? key : [key]
    const queryHash = stableStringify(arrayQueryKey)
    arrayQueryKey = JSON.parse(queryHash)
    return [queryHash, arrayQueryKey]
  } catch {
    throw new Error('A valid query key is required!')
  }
}
