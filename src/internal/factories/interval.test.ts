import { pipe, take, toArray, interval } from '@'

test('interval', async () => {
  const res = interval(100)[pipe](
    take(4),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})
