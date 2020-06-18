import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { emitter } from '../utils/emitter'
import { useEvent } from '../'
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

  describe('event target', () => {
    let et = {} as EventTarget

    beforeEach(() => {
      et = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    })

    it('adds event listeners', async () => {
      const wrapper = renderHook(() => {
        useEvent(et, 'event', listener)
      })

      await Vue.nextTick()
      wrapper.destroy()
      await Vue.nextTick()

      expect(et.addEventListener).toHaveBeenCalled()
      expect(et.removeEventListener).toHaveBeenCalled()
    })

    it('can remove event listeners', async () => {
      let remove: any
      renderHook(() => {
        remove = useEvent(et, 'event', listener)
      })

      await Vue.nextTick()
      remove()
      await Vue.nextTick()

      expect(et.addEventListener).toHaveBeenCalled()
      expect(et.removeEventListener).toHaveBeenCalled()
    })

    it('adds listener when no longer null', async () => {
      const eventRef = ref()

      const remove = useEvent(eventRef, 'event', listener)

      await Vue.nextTick()
      remove()

      expect(et.addEventListener).not.toHaveBeenCalled()
      expect(et.removeEventListener).not.toHaveBeenCalled()

      eventRef.value = et

      await Vue.nextTick()
      expect(et.addEventListener).toHaveBeenCalled()
    })
  })
})
