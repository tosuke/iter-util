import { pipe, delay, map, toArray, concatAll } from '@'

test('concatAll Iterable', async () => {
  const res = [[0, 1], [2, 3]][pipe](
    concatAll(),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})

test('concatAll AsyncIterable', async () => {
  const res = [[0, 1], [2, 3]][pipe](
    delay(10),
    map(iter => iter[pipe](delay(10))),
    concatAll(),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})

test('concatAll Promise', async () => {
  const res = [Promise.resolve(0), Promise.resolve(1)][pipe](
    concatAll(),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1])
})
