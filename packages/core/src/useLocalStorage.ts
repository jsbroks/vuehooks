import { StorageOptions, useStorage } from './useStorage'
import { hasWindow } from './utils'

import { MaybeRef } from './utils/typings'

export function useLocalStorage<T>(
  key: string,
  initialData?: MaybeRef<T>,
  options?: StorageOptions<T>
) {
  const supported = hasWindow() && !!window.localStorage
  const storage = useStorage(localStorage, key, initialData, options)
  return { supported, ...storage }
}
