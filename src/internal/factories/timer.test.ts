import { pipe, take, toArray, timer } from '@'

test('timer', async () => {
  const res = timer(200, 100)[pipe](
    take(4),
    toArray,
  )
  await expect(res).resolves.toEqual([200, 100, 100, 100])
})
