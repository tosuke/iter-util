import { pipe, range, delay, toArray, toSet, mergeMap } from '@'
import { sleep } from '../utils'

test('mergeMap AsyncIterable', async () => {
  const res = [0, 1, 2, 3][pipe](
    delay(10),
    mergeMap(x => range(1, x)[pipe](delay(50 * x))),
    toSet(),
  )
  await expect(res).resolves.toEqual(expect.any(Set))
  const set = await res
  expect(set.has(1)).toBeTruthy()
  expect(set.has(2)).toBeTruthy()
  expect(set.has(3)).toBeTruthy()
  expect(set.has(4)).toBeFalsy()
})

test('mergeMap Iterable', async () => {
  const res = [0, 1, 2, 3][pipe](
    mergeMap(x => range(1, x)),
    toArray(),
  )
  await expect(res).resolves.toEqual([1, 1, 2, 1, 2, 3])
})

test('mergeMap Promise', async () => {
  // sleep sort
  const res = [1, 3, 0, 2][pipe](
    mergeMap(async x => {
      await sleep(x * 50)
      return x
    }),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})

test('mergeMap Primitive', async () => {
  const res = [0, 1, 2, 3][pipe](
    mergeMap(x => x, 2),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})
