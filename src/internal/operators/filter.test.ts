import { pipe, collect, filter } from '@'

test('filter', () => {
  const result = [1, 2, 3, 4][pipe](
    filter(x => x % 2 === 0),
    collect,
  )
  expect(result).toEqual([2, 4])
})

test('filter-is', () => {
  const result = [null, 1, 2, null, 3, 4][pipe](
    filter((x): x is number => x != null),
    collect,
  )
  expect(result).toEqual([1, 2, 3, 4])
})
