import { pipe, toArray, zip } from '@'

test('zip sync', () => {
  const iter1 = [0, 2, 4, 6]
  const iter2 = [1, 3, 5, 7]
  const res = zip(iter1, iter2)[pipe](toArray())
  expect(res).toEqual([[0, 1], [2, 3], [4, 5], [6, 7]])
})
