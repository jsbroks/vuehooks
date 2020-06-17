import { useClamp } from './useClamp'

export function useCounter(
  initial: number = 0,
  min: number = -Infinity,
  max: number = Infinity
) {
  const [count] = useClamp(initial, min, max)

  const inc = (delta = 1) => (count.value += delta)
  const dec = (delta = 1) => (count.value -= delta)
  const get = () => count.value
  const set = (val: number) => (count.value = val)
  const reset = (val = initial) => {
    initial = val
    count.value = val
  }

  return { count, inc, dec, get, reset, set }
}
