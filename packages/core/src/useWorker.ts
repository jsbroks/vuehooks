import { onMounted, onUnmounted, ref, Ref } from '@vue/composition-api'

export function useWorker(url: string) {
  const data: Ref<any> = ref(null)
  const error: Ref<any> = ref(null)
  let worker: Worker

  const create = () => {
    worker = new Worker(url)
    worker.onmessage = e => (data.value = e.data)
    worker.onerror = e => (error.value = e)
  }
  const terminate = () => worker.terminate()
  const post: typeof worker.postMessage = (...args: any[]) =>
    // @ts-ignore
    worker && worker.postMessage(...args)

  onMounted(create)
  onUnmounted(terminate)

  return { data, error, terminate, post }
}
