import { renderHook } from '../../../testing/src'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  // it('sets default value for local storage', () => {
  //   renderHook(() => {
  //     const defaultValue = 'default'
  //     const { supported, data } = useLocalStorage('key', defaultValue)

  //     expect(supported).toBeTruthy()
  //     expect(data.value).toBe(defaultValue)
  //   })
  // })

  it('sets value for local storage with custom serializer', () => {
    renderHook(() => {
      const defaultValue = 'default2'
      const serializer = jest.fn().mockReturnValue(defaultValue)
      const deserializer = jest.fn().mockReturnValue(defaultValue)

      const { data } = useLocalStorage('key', defaultValue, {
        raw: false,
        serializer,
        deserializer
      })

      expect(serializer).toBeCalledTimes(1)
      expect(data.value).toBe(defaultValue)
    })
  })
})
