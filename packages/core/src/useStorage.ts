import { onMounted, Ref, ref, watch } from '@vue/composition-api'
import { useWindowEvent } from './useWindowEvent'
import { hasWindow, noop } from './utils'
import { MaybeRef } from './utils/typings'

type SerializerFunction<T> = (v: T) => string
type DeserializerFunction<T> = (v: string) => T

export type StorageOptions<T> =
  | { raw: true }
  | {
      raw?: false
      serializer: SerializerFunction<T>
      deserializer: DeserializerFunction<T>
    }

export function useStorage<T>(
  storage: Storage,
  key: string,
  initialData?: MaybeRef<T>,
  options?: StorageOptions<T>
) {
  const data = ref(initialData) as Ref<T | undefined>
  const initData = data.value

  const serializer: SerializerFunction<T> = options
    ? options.raw
      ? (noop as any)
      : options.serializer
    : JSON.stringify

  const deserializer: DeserializerFunction<T> = options
    ? options.raw
      ? (noop as any)
      : options.deserializer
    : JSON.parse

  const read = () => {
    const item = storage.getItem(key)
    if (item == null && initData !== undefined) write()
    else data.value = item ? deserializer(item) : initData
  }

  const write = () => {
    const v = data.value
    if (v == null) storage.removeItem(key)
    else storage.setItem(key, serializer(v))
  }

  if (hasWindow()) read()

  onMounted(read)
  useWindowEvent('storage', read)
  watch(data, write, { deep: true })

  return { data }
}
