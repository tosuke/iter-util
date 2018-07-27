import { pipe, take, toArray, interval } from '@'

test('interval', () => {
  const res = interval(100)[pipe](
    take(4),
    toArray,
  )
  expect(res).resolves.toEqual([0, 1, 2, 3])
})
