import { pipe, toArray, range } from '@'

test('range', () => {
  const res = range(1, 3)[pipe](toArray())
  expect(res).toEqual([1, 2, 3])
})
