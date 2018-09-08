import { pipe, toArray, filter } from '@'

test('filter iterable', () => {
  const result = [0, 1, 2, 3][pipe](
    filter(x => x % 2 === 0),
    toArray(),
  )
  expect(result).toEqual([0, 2])
})

test('filter-is', () => {
  const result = [null, 0, 1, null, 2, 3][pipe](
    filter((x): x is number => x != null),
    toArray(),
  )
  expect(result).toEqual([0, 1, 2, 3])
})
