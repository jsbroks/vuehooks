import { renderHook } from '../src'

import { ref } from '@vue/composition-api'

export function useCounter() {
  const count = ref(0)
  const inc = (delta: number) => (count.value += delta)
  return { count, inc }
}

describe('renderHook', () => {
  it('renders a hook', () => {
    renderHook(() => {
      const { count } = useCounter()
      expect(count.value).toEqual(0)
    })
  })

  it('includes returned values', async () => {
    const wrapper = renderHook(() => useCounter())

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.count).toEqual(0)
    expect(wrapper.vm.inc).toBeDefined()
  })
})
