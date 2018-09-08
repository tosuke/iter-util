import { pipe, toArray, concat } from '@'

test('concat sync', () => {
  const res = concat(0, 1, [2, 3])[pipe](toArray())
  expect(res).toEqual([0, 1, 2, 3])
})
