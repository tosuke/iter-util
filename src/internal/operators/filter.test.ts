import { pipe, delay, toArray, filter } from '@'

test('filter iterable', () => {
  const result = [0, 1, 2, 3][pipe](
    filter(x => x % 2 === 0),
    toArray,
  )
  expect(result).toEqual([0, 2])
})

test('filter-is', () => {
  const result = [null, 0, 1, null, 2, 3][pipe](
    filter((x): x is number => x != null),
    toArray,
  )
  expect(result).toEqual([0, 1, 2, 3])
})

test('filter asyncIterable', async () => {
  const result = [0, 1, 2, 3][pipe](
    delay(100),
    filter(x => x % 2 === 0),
    toArray,
  )
  await expect(result).resolves.toEqual([0, 2])
})
