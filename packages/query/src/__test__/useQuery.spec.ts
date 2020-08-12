import Vue from 'vue'
import { useQuery } from '../'
import { renderHook } from '../../../testing/src'
import { QueryStatus } from '../query'

describe('useQuery', () => {
  const mockFetch = jest.fn().mockResolvedValue({ mock: true })

  const fetch = () => {
    console.log('calling')
    return Promise.resolve({
      idk: [{ id: 1 }, { id: 2 }]
    })
  }

  it('calls query function', async () => {
    const wrapper = renderHook(() => {
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
    await Vue.nextTick()
    await Vue.nextTick()
    await Vue.nextTick()
    await Vue.nextTick()
    console.log(wrapper.vm.status)
    console.log(wrapper.vm.data)
  })
})
