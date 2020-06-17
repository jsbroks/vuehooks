import { renderHook } from '../../../testing/src'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('sets initial value', () => {
    const wrapper = renderHook(() => useCounter(5))
    expect(wrapper.vm.count).toBe(5)
    expect(wrapper.vm.inc).toBeDefined()
    expect(wrapper.vm.set).toBeDefined()
    expect(wrapper.vm.reset).toBeDefined()
    expect(wrapper.vm.dec).toBeDefined()
  })

  it('increments', () => {
    renderHook(() => {
      const { count, inc } = useCounter()
      expect(count.value).toEqual(0)
      inc(10)
      expect(count.value).toEqual(10)
    })
  })

  it('increments defaults 1', () => {
    renderHook(() => {
      const { count, inc } = useCounter()
      expect(count.value).toEqual(0)
      inc()
      expect(count.value).toEqual(1)
    })
  })

  it('decrements', () => {
    renderHook(() => {
      const { count, dec } = useCounter(10)
      expect(count.value).toEqual(10)
      dec(10)
      expect(count.value).toEqual(0)
    })
  })

  it('increments defaults -1', () => {
    renderHook(() => {
      const { count, dec } = useCounter()
      expect(count.value).toEqual(0)
      dec()
      expect(count.value).toEqual(-1)
    })
  })

  it('resets', () => {
    renderHook(() => {
      const { count, inc, reset } = useCounter(10)
      expect(count.value).toEqual(10)
      inc(10)
      reset()
      expect(count.value).toEqual(10)
    })
  })

  it('resets and with new initial value', () => {
    renderHook(() => {
      const { count, inc, reset } = useCounter(10)
      expect(count.value).toEqual(10)
      inc(10)
      reset(5)
      expect(count.value).toEqual(5)
      inc(10)
      reset()
      expect(count.value).toEqual(5)
    })
  })

  it('sets value', () => {
    renderHook(() => {
      const { count, set } = useCounter(5)
      set(2)
      expect(count.value).toEqual(2)
    })
  })

  it('returns count on get', () => {
    renderHook(() => {
      const { count, get } = useCounter(5, 0, 20)
      expect(count.value).toEqual(get())
    })
  })
})
