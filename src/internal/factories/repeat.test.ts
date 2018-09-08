import { pipe, take, toArray, repeat } from '@'

test('repeat iterable', () => {
  const res = repeat([0, 1, 2, 3])[pipe](
    take(8),
    toArray(),
  )
  expect(res).toEqual([0, 1, 2, 3, 0, 1, 2, 3])
})

test('repeat iterable once', () => {
  const res = repeat([0, 1, 2, 3], 1)[pipe](toArray())
  expect(res).toEqual([0, 1, 2, 3])
})

test('repeat iterable with count', () => {
  const res = repeat([0, 1, 2, 3], 2)[pipe](toArray())
  expect(res).toEqual([0, 1, 2, 3, 0, 1, 2, 3])
})

test('repeat number', () => {
  const res = repeat(100)[pipe](
    take(2),
    toArray(),
  )
  expect(res).toEqual([100, 100])
})

test('repeat number with count', () => {
  const res = repeat(100, 2)[pipe](toArray())
  expect(res).toEqual([100, 100])
})
