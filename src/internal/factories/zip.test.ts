import { pipe, delay, toArray, zip } from '@'

test('zip sync', () => {
  const iter1 = [0, 2, 4, 6]
  const iter2 = [1, 3, 5, 7]
  const res = zip(iter1, iter2)[pipe](toArray())
  expect(res).toEqual([[0, 1], [2, 3], [4, 5], [6, 7]])
})

test('zip sync async', async () => {
  const iter1 = [0, 2, 4, 6]
  const iter2 = [1, 3, 5, 7][pipe](delay(100))
  const res = zip(iter1, iter2)[pipe](toArray())
  await expect(res).resolves.toEqual([[0, 1], [2, 3], [4, 5], [6, 7]])
})

test('zip async', async () => {
  const iter1 = [0, 2, 4, 6][pipe](delay(50))
  const iter2 = [1, 3, 5, 7][pipe](delay(100))
  const res = zip(iter1, iter2)[pipe](toArray())
  await expect(res).resolves.toEqual([[0, 1], [2, 3], [4, 5], [6, 7]])
})
