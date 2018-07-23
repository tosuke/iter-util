import { pipe, take, collect, interval } from '@'

test('interval', async () => {
  const res = await interval(100)[pipe](
    take(4),
    collect,
  )
  expect(res).toEqual([0, 1, 2, 3])
})
