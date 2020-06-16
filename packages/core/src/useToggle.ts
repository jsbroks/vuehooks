import { ref } from '@vue/composition-api'

export default function useToggle(value: boolean = false) {
  const on = ref(value)
  const isNull = (v: any) => v == null
  const toggle = (v?: boolean) => (on.value = isNull(v) ? !on.value : v!)
  return [on, toggle]
}
