import { useCounter } from '../'

describe('useCounter', () => {
  it('sets initial value', () => {
    const { count, inc, set, reset, dec } = useCounter(5)
    expect(count.value).toBe(5)
    expect(inc).toBeDefined()
    expect(set).toBeDefined()
    expect(reset).toBeDefined()
    expect(dec).toBeDefined()
  })

  it('increments', () => {
    const { count, inc } = useCounter()
    expect(count.value).toEqual(0)
    inc(10)
    expect(count.value).toEqual(10)
  })

  it('increments defaults 1', () => {
    const { count, inc } = useCounter()
    expect(count.value).toEqual(0)
    inc()
    expect(count.value).toEqual(1)
  })

  it('decrements', () => {
    const { count, dec } = useCounter(10)
    expect(count.value).toEqual(10)
    dec(10)
    expect(count.value).toEqual(0)
  })

  it('increments defaults -1', () => {
    const { count, dec } = useCounter()
    expect(count.value).toEqual(0)
    dec()
    expect(count.value).toEqual(-1)
  })

  it('resets', () => {
    const { count, inc, reset } = useCounter(10)
    expect(count.value).toEqual(10)
    inc(10)
    reset()
    expect(count.value).toEqual(10)
  })

  it('resets and with new initial value', () => {
    const { count, inc, reset } = useCounter(10)
    expect(count.value).toEqual(10)
    inc(10)
    reset(5)
    expect(count.value).toEqual(5)
    inc(10)
    reset()
    expect(count.value).toEqual(5)
  })

  it('sets value', () => {
    const { count, set } = useCounter(5)
    set(2)
    expect(count.value).toEqual(2)
  })

  it('returns count on get', () => {
    const { count, get } = useCounter(5, 0, 20)
    expect(count.value).toEqual(get())
  })
})
