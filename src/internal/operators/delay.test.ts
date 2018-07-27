import { pipe, toArray, delay } from '@'

test('delay', async () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    toArray,
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})
