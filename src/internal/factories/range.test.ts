import { pipe, collect, range } from '@'

test('range', () => {
  const res = range(1, 3)[pipe](collect)
  expect(res).toEqual([1, 2, 3])
})
