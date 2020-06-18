import { createEmitter } from '../'

describe('createEmitter', () => {
  it('returns an emitter', () => {
    const emitter = createEmitter()

    expect(typeof emitter).toBe('object')
    expect(typeof emitter.on).toBe('function')
    expect(typeof emitter.off).toBe('function')
    expect(typeof emitter.emit).toBe('function')
  })
})
