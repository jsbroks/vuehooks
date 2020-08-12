import { defaultQueryKeySerializerFn } from '../queryKey'

describe('defaultQuerySerializationFunction', () => {
  it('serializes booleans', () => {
    const [aHash, a] = defaultQueryKeySerializerFn(true)
    const [bHash, b] = defaultQueryKeySerializerFn(false)

    expect(a).toEqual([true])
    expect(b).toEqual([false])
    expect(aHash).toEqual('[true]')
    expect(bHash).not.toEqual([false])
    expect(bHash).toEqual('[false]')
  })

  test.each([
    ['boolean', true],
    ['number', 0],
    ['string', 'test']
  ])('serializes single %s array to match primitives', (_, input) => {
    const [aHash, a] = defaultQueryKeySerializerFn(input)
    const [bHash, b] = defaultQueryKeySerializerFn([input])

    expect(a).toEqual(b)
    expect(aHash).toEqual(bHash)
  })

  it('serializes nested objects', () => {
    const a = { a: 'hello', b: 20, c: { d: true, g: [{}, false] } }
    const b = { b: 20, c: { g: [{}, false], d: true }, a: 'hello' }

    const [aHash, aKey] = defaultQueryKeySerializerFn(a)
    const [bHash, bKey] = defaultQueryKeySerializerFn(b)

    expect(aHash).toEqual(bHash)
    expect(aKey).toEqual(bKey)
  })

  it('does not accept functions', () => {
    const fn = () => defaultQueryKeySerializerFn(() => {})
    expect(fn).toThrowError()
  })
})
