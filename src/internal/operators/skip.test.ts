import { pipe, delay, toArray, skip } from '@'

test('skip iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    skip(2),
    toArray,
  )
  expect(res).toEqual([2, 3])
})

test('skip asyncIterable', async () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    skip(2),
    toArray,
  )
  await expect(res).resolves.toEqual([2, 3])
})
