import { deepEqual } from './utils/equals'
import { QueryKeyArray } from './queryKey'
import { createEmitter, Emitter } from '@vuehooks/core'

export enum QueryStatus {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success'
}

export type QueryFunction<TResult> = (
  ...args: any[]
) => TResult | Promise<TResult>

export type RetryFunction<TError> = (
  failureCount: number,
  error: TError
) => boolean

/**
 * Query Configs
 */
export interface BaseQueryConfig<TResult, TError = unknown> {
  queryFn?: QueryFunction<TResult>
  isDataEqual?: (newData: unknown, oldData: unknown) => boolean
  retry?: boolean | number | RetryFunction<TError>
}

export interface QueryConfig<TResult, TError = unknown>
  extends BaseQueryConfig<TResult, TError> {}

export interface QueryInitConfig<TResult, TError = unknown> {
  queryKey: QueryKeyArray
  queryHash: string
  config: QueryConfig<TResult, TError>
}

export interface QueryState<TResult, TError = unknown> {
  data: TResult | undefined
  status: QueryStatus
  error?: TError
}

export type SubscriptionHandler<TResult, TError> = (
  status: QueryState<TResult, TError>
) => void

export class Query<TResult, TError> {
  readonly queryKey: QueryKeyArray
  readonly queryHash: string
  readonly config: QueryConfig<TResult, TError>

  state: QueryState<TResult, TError>

  private emitter: Emitter
  private promise?: Promise<TResult | undefined>

  constructor(init: QueryInitConfig<TResult, TError>) {
    this.config = { isDataEqual: deepEqual, ...init.config }
    this.queryKey = init.queryKey
    this.queryHash = init.queryHash
    this.emitter = createEmitter()

    // Default state
    this.state = { data: undefined, status: QueryStatus.Idle }
  }

  async fetch(): Promise<TResult | undefined> {
    let queryFn = this.config.queryFn

    if (!queryFn) return
    if (this.promise) return this.promise

    this.promise = (async () => {
      try {
        this.dispatch({ status: QueryStatus.Loading })
        const data = await queryFn!()

        if (!this.config.isDataEqual!(this.state.data, data))
          this.dispatch({ status: QueryStatus.Success, data })

        delete this.promise

        return data
      } catch (error) {
        this.dispatch({ status: QueryStatus.Error })
        delete this.promise
        throw error
      }
    })()

    return this.promise
  }

  private dispatch(state: Partial<QueryState<TResult, TError>>) {
    this.state = { ...this.state, ...state }
    this.emitter.emit('*', { state: this.state })
  }

  subscribe(handler: SubscriptionHandler<TResult, TError>) {
    this.emitter.on('*', handler)
  }

  unsubscribe(handler: SubscriptionHandler<TResult, TError>) {
    this.emitter.off('*', handler)
  }
}
