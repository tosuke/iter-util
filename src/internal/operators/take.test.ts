import { pipe, delay, toArray, take } from '@'

test('take iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    take(2),
    toArray,
  )
  expect(res).toEqual([0, 1])
})

test('take asyncIterable', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    take(2),
    toArray,
  )
  expect(res).resolves.toEqual([0, 1])
})
