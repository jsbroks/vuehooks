import { StorageOptions, useStorage } from './useStorage'
import { hasWindow } from './utils'

import { MaybeRef } from './utils/typings'

export function useSessionStorage<T>(
  key: string,
  initialData?: MaybeRef<T>,
  options?: StorageOptions<T>
) {
  const supported = hasWindow() && !!window.sessionStorage
  const storage = useStorage(sessionStorage, key, initialData, options)
  return { supported, ...storage }
}
