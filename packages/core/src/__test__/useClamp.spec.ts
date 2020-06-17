import { renderHook } from '../../../testing/src'
import { useClamp } from '../useClamp'

describe('useClamp', () => {
  it('sets initial value', () => {
    const wrapper = renderHook(() => {
      const [number, raw] = useClamp(5, 0, 10)
      return { number, raw }
    })

    expect(wrapper.vm.number).toBeDefined()
    expect(wrapper.vm.number).toEqual(5)
    expect(wrapper.vm.raw).toBeDefined()
    expect(wrapper.vm.raw).toEqual(5)
  })

  it('clamps to min', () => {
    renderHook(() => {
      const [number, raw] = useClamp(0, 0, 10)
      number.value = -1

      expect(number.value).toEqual(0)
      expect(raw.value).toEqual(-1)
      return { number, raw }
    })
  })

  it('clamps to max', () => {
    renderHook(() => {
      const [number, raw] = useClamp(0, 0, 10)
      number.value = 11

      expect(number.value).toEqual(10)
      expect(raw.value).toEqual(11)
      return { number, raw }
    })
  })
})
