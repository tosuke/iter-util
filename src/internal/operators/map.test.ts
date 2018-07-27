import { pipe, delay, toArray, map } from '@'

test('map iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    map(x => x * 2),
    toArray,
  )
  expect(res).toEqual([0, 2, 4, 6])
})

test('map asyncIterable', async () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    map(x => x * 2),
    toArray,
  )
  await expect(res).resolves.toEqual([0, 2, 4, 6])
})
