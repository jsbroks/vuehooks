import { emitter } from '../emitter'

describe('emitter', () => {
  it('should export a function', () => {
    expect(typeof emitter).toBe('function')
  })

  it('should accept an optional event handler map', () => {
    expect(() => emitter(new Map())).not.toThrow()
    const map = new Map()

    const a = jest.fn()
    const b = jest.fn()

    map.set('foo', [a, b])

    const events = emitter(map)
    events.emit('foo')

    expect(a).toBeCalledTimes(1)
    expect(b).toBeCalledTimes(1)
  })

  describe('on', () => {
    it('calls multiple functions', () => {
      const mit = emitter()

      const a = jest.fn()
      const b = jest.fn()
      mit.on('test', a)
      mit.on('test', b)

      mit.emit('test')

      expect(a).toBeCalledTimes(1)
      expect(b).toBeCalledTimes(1)
    })

    it('removes multiple functions', () => {
      const mit = emitter()

      const a = jest.fn()
      const b = jest.fn()
      mit.on('test', a)
      mit.on('test', b)
      mit.off('test', a)
      mit.off('test', b)

      mit.emit('test')

      expect(a).not.toBeCalled()
      expect(b).not.toBeCalled()
    })

    it("removes a that doesn't exist in map", () => {
      const mit = emitter()

      mit.off('test', () => {})
    })
  })
})
