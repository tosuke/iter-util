import { pipe, toArray, from } from '@'

test('from iterable', () => {
  const res = from([0, 1, 2])[pipe](toArray())
  expect(res).toEqual([0, 1, 2])
})

test('from primitive', () => {
  const res = from(1)[pipe](toArray())
  expect(res).toEqual([1])
})
