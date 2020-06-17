import { computed, ref, WritableComputedRef, Ref } from '@vue/composition-api'

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

export function useClamp(
  initial: number,
  min: number,
  max: number
): [WritableComputedRef<number>, Ref<number>] {
  const number = ref(initial)
  return [
    computed({
      get: () => clamp(number.value, min, max),
      set: val => (number.value = val)
    }),
    number
  ]
}
