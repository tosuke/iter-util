import { pipe, delay, collect, skip } from '@'

test('skip iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    skip(2),
    collect,
  )
  expect(res).toEqual([2, 3])
})

test('skip asyncIterable', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    skip(2),
    collect,
  )
  expect(res).resolves.toEqual([2, 3])
})
