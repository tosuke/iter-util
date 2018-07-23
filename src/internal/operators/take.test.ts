import { pipe, delay, collect, take } from '@'

test('take iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    take(2),
    collect,
  )
  expect(res).toEqual([0, 1])
})

test('take asyncIterable', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    take(2),
    collect,
  )
  expect(res).resolves.toEqual([0, 1])
})
