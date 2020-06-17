import {
  ref,
  Ref,
  computed,
  onMounted,
  onUnmounted
} from '@vue/composition-api'
import { createWorkerBlobUrl } from './utils/worker/createWorkerBlob'

export enum WorkerStatus {
  Pending = 'pending',
  Success = 'success',
  Running = 'running',
  Error = 'error',
  TimeoutExpired = 'timeout expired'
}
export enum TransferableType {
  Auto = 'auto',
  None = 'none'
}

type Options = {
  timeout?: number
  dependencies?: string[]
  transferable?: TransferableType
}

type Promise<T extends (...args: any[]) => any> = {
  reject: (result: ReturnType<T> | ErrorEvent) => void
  resolve: (result: ReturnType<T>) => void
}

const noop = () => {}

type WorkerWithUrl = Worker & { _url?: string }

export function useWorkerFn<T extends (...args: any[]) => any>(
  fn: T,
  {
    timeout = 0,
    dependencies = [],
    transferable = TransferableType.Auto
  }: Options = {}
) {
  const worker: Ref<WorkerWithUrl | null> = ref(null)
  const workerStatus = ref(WorkerStatus.Pending)
  const running = computed(() => workerStatus.value === WorkerStatus.Running)
  const promise: Promise<T> = { reject: noop, resolve: noop }

  let timeoutObject: any | undefined = undefined

  const terminate = (status: WorkerStatus = WorkerStatus.Pending) => {
    if (!worker.value || !worker.value._url) return

    worker.value.terminate()
    URL.revokeObjectURL(worker.value._url)
    worker.value = null

    promise.reject = noop
    promise.resolve = noop

    window.clearTimeout(timeoutObject)

    workerStatus.value = status
  }

  const url = createWorkerBlobUrl(fn, dependencies, transferable)
  const createWorker = () => {
    const worker: WorkerWithUrl = new Worker(url)
    worker._url = url

    worker.onmessage = e => {
      const [status, result] = e.data as [WorkerStatus, ReturnType<T>]
      const method = status === WorkerStatus.Success ? 'resolve' : 'reject'
      promise[method](result)
      terminate(status)
    }

    worker.onerror = e => {
      promise.reject(e)
      workerStatus.value = WorkerStatus.Error
    }

    if (timeout)
      timeoutObject = setTimeout(() => {
        terminate(WorkerStatus.TimeoutExpired)
      }, timeout)

    return worker
  }

  const start = (...args: Parameters<T>) =>
    new Promise<ReturnType<T>>((resolve, reject) => {
      promise.resolve = resolve
      promise.reject = reject

      worker.value && worker.value.postMessage([[...args]])
      workerStatus.value = WorkerStatus.Running
    })

  const run = (...args: Parameters<T>) => {
    if (running.value) return Promise.reject()

    worker.value = createWorker()
    return start(...args)
  }

  onMounted(terminate)
  onUnmounted(terminate)

  return { fn: run, status: workerStatus, running, terminate }
}
