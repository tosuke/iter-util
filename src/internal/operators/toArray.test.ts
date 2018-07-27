import { pipe, delay, toArray } from '@'

test('collect iterable', () => {
  const res = toArray([0, 1, 2, 3])
  expect(res).toEqual([0, 1, 2, 3])
})

test('collect asyncIterable', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    toArray,
  )
  expect(res).resolves.toEqual([0, 1, 2, 3])
})
