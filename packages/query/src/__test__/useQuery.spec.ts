import Vue from 'vue'
import { useQuery } from '../'
import { renderHook } from '../../../testing/src'
import { QueryStatus } from '../query'

describe('useQuery', () => {
  const mockFetchOutput = { mock: true }
  const mockFetch = jest.fn().mockResolvedValue(mockFetchOutput)

  // const fetch = () => {
  //   console.log('calling')
  //   return Promise.resolve({
  //     idk: [{ id: 1 }, { id: 2 }]
  //   })
  // }

  it('calls query function', async () => {
    renderHook(() => {
      const { data, status, isLoading, isSuccess, isError, query } = useQuery(
        'fetch',
        mockFetch
      )

      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(data.value).toBe(undefined)
      expect(isLoading.value).toBe(false)
      expect(isSuccess.value).toBe(false)
      expect(isError.value).toBe(false)
      expect(status.value).toBe(QueryStatus.Idle)

      return { data, query, status }
    })

    await Vue.nextTick()
    // expect(wrapper.vm.data).toBe(mockFetchOutput)
  })
})
