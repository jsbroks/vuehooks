import { useTimeout } from '../'

describe('useTimeout', () => {
  beforeAll(() => jest.useFakeTimers())

  it('does not start without start()', () => {
    const { ready } = useTimeout(10)
    expect(ready.value).toBeFalsy()
  })

  it('sets value after period', () => {
    const { ready, start } = useTimeout(10)
    start()
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10)
    jest.advanceTimersByTime(1)
    expect(ready.value).toBeFalsy()
    jest.runOnlyPendingTimers()
    expect(ready.value).toBeTruthy()
  })

  it('can stop a timeout', () => {
    const { ready, stop, start } = useTimeout(10)
    start()

    jest.advanceTimersByTime(1)

    expect(ready.value).toBeFalsy()
    stop()

    jest.runOnlyPendingTimers()
    expect(ready.value).toBeFalsy()
  })

  it('can start when created', () => {
    const { ready } = useTimeout(10, true)
    jest.runOnlyPendingTimers()
    expect(ready.value).toBeTruthy()
  })

  it('clears timer on complete', () => {
    const { ready } = useTimeout(10, true)
    jest.runOnlyPendingTimers()
    expect(ready.value).toBeTruthy()
    expect(clearTimeout).toBeCalled()
  })

  it('clears timer on stop', () => {
    const { stop } = useTimeout(10, true)
    jest.advanceTimersByTime(5)
    stop()
    expect(clearTimeout).toBeCalled()
  })
})
