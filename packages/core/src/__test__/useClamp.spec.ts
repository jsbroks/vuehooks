import { useClamp } from '../useClamp'

describe('useClamp', () => {
  it('sets initial value', () => {
    const [number, raw] = useClamp(5, 0, 10)

    expect(number).toBeDefined()
    expect(number.value).toEqual(5)
    expect(raw).toBeDefined()
    expect(raw.value).toEqual(5)
  })

  it('clamps to min', () => {
    const [number, raw] = useClamp(0, 0, 10)
    number.value = -1

    expect(number.value).toEqual(0)
    expect(raw.value).toEqual(-1)
  })

  it('clamps to max', () => {
    const [number, raw] = useClamp(0, 0, 10)
    number.value = 11

    expect(number.value).toEqual(10)
    expect(raw.value).toEqual(11)
  })
})
