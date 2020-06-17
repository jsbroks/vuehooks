import { ref } from '@vue/composition-api'

const isNull = (v: any) => v == null

export default function useToggle(value: boolean = false) {
  const on = ref(value)
  const set = (v: boolean) => (on.value = v)
  const toggle = (v?: boolean) => set(isNull(v) ? !on.value : v!)
  return { on, toggle, set }
}
