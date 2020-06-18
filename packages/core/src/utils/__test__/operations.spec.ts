import { noop } from '../operations'

describe('operations', () => {
  it('returns nothing', () => {
    const r = noop()
    expect(r).toBeUndefined()
  })
})
