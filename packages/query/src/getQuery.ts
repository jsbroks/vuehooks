import { isObject } from './utils'
import { QueryConfig, QueryFunction } from './query'
import { QueryKey } from './queryKey'

export function getQueryArgs<TResult, TError, TOptions = undefined>(
  args: any[]
): [QueryKey, QueryConfig<TResult, TError>, TOptions] {
  let queryKey: QueryKey
  let queryFn: QueryFunction<TResult> | undefined
  let config: QueryConfig<TResult, TError> | undefined
  let options: TOptions

  if (isObject(args[0])) {
    queryKey = args[0].queryKey
    queryFn = args[0].queryFn
    config = args[0].config
    options = args[1]
  } else if (isObject(args[1])) {
    queryKey = args[0]
    config = args[1]
    options = args[2]
  } else {
    queryKey = args[0]
    queryFn = args[1]
    config = args[2]
    options = args[3]
  }

  config = config ?? {}
  if (queryFn) config = { ...config, queryFn }

  return [queryKey, config, options]
}
