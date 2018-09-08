import { toArray } from '@'

test('collect iterable', () => {
  const res = toArray()([0, 1, 2, 3])
  expect(res).toEqual([0, 1, 2, 3])
})
