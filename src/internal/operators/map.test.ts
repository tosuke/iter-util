import { pipe, interval, take, collect, map } from '@'

test('map iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    map(x => x * 2),
    collect,
  )
  expect(res).toEqual([0, 2, 4, 6])
})

test('map asyncIterable', async () => {
  const res = await interval(100)[pipe](
    take(4),
    map(x => x * 2),
    collect,
  )
  expect(res).toEqual([0, 2, 4, 6])
})
