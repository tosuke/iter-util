import { pipe, toArray, map } from '@'

test('map iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    map(x => x * 2),
    toArray(),
  )
  expect(res).toEqual([0, 2, 4, 6])
})
