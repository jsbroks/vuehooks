import { useToggle } from '../'

describe('useToggle', () => {
  it('has correct functions returned', () => {
    const { on, toggle, set } = useToggle()
    expect(on.value).toBeFalsy()
    expect(toggle).toBeDefined()
    expect(set).toBeDefined()
  })

  it('sets initial value', () => {
    const { on } = useToggle(true)
    expect(on.value).toBeTruthy()
  })

  it('toggles value', () => {
    const { on, toggle } = useToggle()
    toggle()
    expect(on.value).toBeTruthy()
    toggle()
    expect(on.value).toBeFalsy()
  })

  it('sets value with', () => {
    const { on, toggle } = useToggle()
    toggle(false)
    expect(on.value).toBeFalsy()
    toggle(true)
    expect(on.value).toBeTruthy()
  })

  it('sets value', () => {
    const { on, set } = useToggle()
    set(false)
    expect(on.value).toBeFalsy()
    set(true)
    expect(on.value).toBeTruthy()
  })
})
