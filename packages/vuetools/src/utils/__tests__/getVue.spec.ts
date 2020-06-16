import { renderHook } from '../../../../test/renderHook'

import { getVue } from '../getVue'

describe('returns vue', () => {
  it('is defined', () => {
    renderHook(() => {
      const vue = getVue()
      console.log(vue)
      expect(vue).toBeDefined()
    })
  })
})
