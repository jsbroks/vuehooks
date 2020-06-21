import { useBus } from '..'
import { useEvent } from '../useEvent'
import { renderHook } from '../../../testing/src'

describe('useBus', () => {
  it('creates a bus', () => {
    const bus = useBus()

    expect(bus.on).toBeDefined()
    expect(bus.off).toBeDefined()
    expect(bus.emit).toBeDefined()
  })

  it('listens for events globally', () => {
    const callback = jest.fn()

    const bus1 = useBus()
    const bus2 = useBus()

    bus1.on('test', callback)
    bus2.emit('test')
    bus1.off('test', callback)
    bus2.emit('test')

    expect(callback).toBeCalledTimes(1)
  })

  it('works with useEvent', () => {
    const callback = jest.fn()

    const bus2 = useBus()
    const wrapper = renderHook(() => {
      const bus1 = useBus()
      useEvent(bus1, 'test', callback)
      bus2.emit('test')
    })

    wrapper.destroy()
    bus2.emit('test')

    expect(callback).toBeCalledTimes(1)
  })
})
