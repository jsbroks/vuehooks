import { renderHook } from './index'

import { ref } from '@vue/composition-api'

export function useCounter() {
  const count = ref(0)
  const inc = (delta: number) => (count.value += delta)
  return { count, inc }
}

describe('renderHook', () => {
  it('renders the hook', () => {
    renderHook(() => {
      const { count } = useCounter()
      expect(count.value).toEqual(0)
    })
  })

  it('has hook values on component', async () => {
    const wrapper = renderHook(() => useCounter())

    expect(wrapper.vm.count).toEqual(0)
    expect(wrapper.vm.inc).toBeDefined()
  })
})
