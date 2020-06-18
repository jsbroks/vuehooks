import { emitter } from '../utils/emitter'
import { useEvent } from '../useEvent'
import { renderHook } from '../../../testing/src'

describe('useEvent', () => {
  const listener = jest.fn()

  beforeEach(() => listener.mockReset())

  describe('emitter', () => {
    let testEmitter = emitter()

    beforeEach(() => (testEmitter = emitter()))

    it('calls listener', () => {
      renderHook(() => {
        useEvent(testEmitter, 'test', listener)
        testEmitter.emit('test')
      })
      expect(listener).toHaveBeenCalled()
    })

    it('removes listener', () => {
      renderHook(() => {
        const remove = useEvent(testEmitter, 'test', listener)
        remove()
        testEmitter.emit('test')
      })
      expect(listener).not.toHaveBeenCalled()
    })

    it('removes listener on unMounted', () => {
      const wrapper = renderHook(() => {
        useEvent(testEmitter, 'test', listener)
        testEmitter.emit('test')
        testEmitter.emit('test')
      })

      wrapper.destroy()

      testEmitter.emit('test')
      expect(listener).toHaveBeenCalledTimes(2)
    })

    it('listen to all events', () => {
      renderHook(() => {
        useEvent(testEmitter, '*', listener)
        testEmitter.emit('test')
      })
      expect(listener).toHaveBeenCalledWith('test', undefined)
    })
  })

  // describe('window', () => {
  //   const element: Window = {} as any

  //   beforeEach(() => {
  //     element.addEventListener = jest.fn()
  //     element.removeEventListener = jest.fn()
  //   })

  //   it('adds event listeners', () => {
  //     const wrapper = renderHook(() => {
  //       useEvent(window, 'load', listener)
  //     })
  //     wrapper.vm.
  //     wrapper.destroy()

  //     expect(element.addEventListener).toHaveBeenCalled()
  //     expect(element.removeEventListener).toHaveBeenCalled()
  //   })
  // })

  //   describe('document', () => {})
})
