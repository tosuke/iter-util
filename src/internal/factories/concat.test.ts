import { pipe, delay, toArray, concat } from '@'

test('concat sync', () => {
  const res = concat(0, 1, [2, 3])[pipe](toArray())
  expect(res).toEqual([0, 1, 2, 3])
})

test('concat async', async () => {
  const aiter1 = [1, 2, 3][pipe](delay(50))
  const aiter2 = [4, 5, 6][pipe](delay(100))
  const res = concat(Promise.resolve(0), aiter1, aiter2, 7)[pipe](toArray())
  await expect(res).resolves.toEqual([0, 1, 2, 3, 4, 5, 6, 7])
})
