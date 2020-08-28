import { useMediaQuery } from './useMediaQuery'

export function usePrint() {
  return { printing: useMediaQuery('print') }
}
