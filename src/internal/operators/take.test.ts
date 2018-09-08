import { pipe, toArray, take } from '@'

test('take iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    take(2),
    toArray(),
  )
  expect(res).toEqual([0, 1])
})
