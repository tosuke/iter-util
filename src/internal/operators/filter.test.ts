import { pipe, interval, take, collect, filter } from '@'

test('filter iterable', () => {
  const result = [0, 1, 2, 3][pipe](
    filter(x => x % 2 === 0),
    collect,
  )
  expect(result).toEqual([0, 2])
})

test('filter-is', () => {
  const result = [null, 0, 1, null, 2, 3][pipe](
    filter((x): x is number => x != null),
    collect,
  )
  expect(result).toEqual([0, 1, 2, 3])
})

test('filter asyncIterable', async () => {
  const result = await interval(100)[pipe](
    take(4),
    filter(x => x % 2 === 0),
    collect,
  )
  expect(result).toEqual([0, 2])
})
