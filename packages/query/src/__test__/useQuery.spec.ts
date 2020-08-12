import { useQuery } from '../'

describe('useQuery', () => {
  const fetch = () =>
    Promise.resolve({
      idk: [{ id: 1 }, { id: 2 }]
    })

  it('', async () => {
    const { data } = useQuery('fetch', fetch)
    expect(data).toBe(await fetch())
  })
})
