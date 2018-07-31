import { pipe, range, delay, toArray, concatMap } from '@'

test('concatMap Iterable', async () => {
  const res = [0, 1, 2, 3][pipe](
    concatMap(x => range(1, x)[pipe](delay(10))),
    toArray(),
  )
  await expect(res).resolves.toEqual([1, 1, 2, 1, 2, 3])
})

test('concatpMap AsyncIterable', async () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    concatMap(x => range(1, x)[pipe](delay(10))),
    toArray(),
  )
  await expect(res).resolves.toEqual([1, 1, 2, 1, 2, 3])
})
