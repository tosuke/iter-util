import { pipe, toArray, skip } from '@'

test('skip iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    skip(2),
    toArray(),
  )
  expect(res).toEqual([2, 3])
})
