import Vue from 'vue'
import { useTimeoutFn } from '../'
import { renderHook } from '../../../testing/src'

describe('useTimeoutFn', () => {
  const fn = jest.fn()

  beforeAll(() => jest.useFakeTimers())
  beforeEach(() => fn.mockReset())

  it('calls function', async () => {
    renderHook(() => {
      const { start } = useTimeoutFn(fn, 10)
      start()
    })
    jest.runOnlyPendingTimers()
    await Vue.nextTick()
    expect(fn).toHaveBeenCalled()
  })
})
