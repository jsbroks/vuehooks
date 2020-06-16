import renderHook from '../../../test/renderHook'

import { getVue } from '../getVue'

describe('returns vue', () => {
  renderHook(() => {
    const vue = getVue()
    console.log(vue)
    expect(vue).toBeDefined()
  })
})
