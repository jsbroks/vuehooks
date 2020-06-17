import { useMediaQuery } from './useMediaQuery'

export default function usePrint() {
  return { printing: useMediaQuery('print') }
}
