import { noop } from '../'

describe('operations', () => {
  it('returns nothing', () => {
    const r = noop()
    expect(r).toBeUndefined()
  })
})
