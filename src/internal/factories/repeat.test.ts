import { pipe, delay, take, toArray, repeat } from '@'
import { sleep } from '../utils'

test('repeat iterable', () => {
  const res = repeat([0, 1, 2, 3])[pipe](
    take(8),
    toArray(),
  )
  expect(res).toEqual([0, 1, 2, 3, 0, 1, 2, 3])
})

test('repeat iterable once', () => {
  const res = repeat([0, 1, 2, 3], 1)[pipe](toArray())
  expect(res).toEqual([0, 1, 2, 3])
})

test('repeat iterable with count', () => {
  const res = repeat([0, 1, 2, 3], 2)[pipe](toArray())
  expect(res).toEqual([0, 1, 2, 3, 0, 1, 2, 3])
})

test('repeat asyncIterable', async () => {
  const asyncIter = [0, 1, 2, 3][pipe](delay(100))
  const res = repeat(asyncIter)[pipe](
    take(8),
    toArray(),
  )
  await expect(res).resolves.toEqual([0, 1, 2, 3, 0, 1, 2, 3])
})

test('repeat asyncIterable once', async () => {
  const asyncIter = [0, 1, 2, 3][pipe](delay(100))
  const res = repeat(asyncIter, 1)[pipe](toArray())
  await expect(res).resolves.toEqual([0, 1, 2, 3])
})

test('repeat asyncIterable with count', async () => {
  const asyncIter = [0, 1, 2, 3][pipe](delay(100))
  const res = repeat(asyncIter, 2)[pipe](toArray())
  await expect(res).resolves.toEqual([0, 1, 2, 3, 0, 1, 2, 3])
})

test('repeat promise', async () => {
  const promise = sleep(100).then(() => 100)
  const res = repeat(promise)[pipe](
    take(2),
    toArray(),
  )
  await expect(res).resolves.toEqual([100, 100])
})

test('repeat promise with count', async () => {
  const promise = sleep(100).then(() => 100)
  const res = repeat(promise, 2)[pipe](toArray())
  await expect(res).resolves.toEqual([100, 100])
})

test('repeat number', () => {
  const res = repeat(100)[pipe](
    take(2),
    toArray(),
  )
  expect(res).toEqual([100, 100])
})

test('repeat number with count', () => {
  const res = repeat(100, 2)[pipe](toArray())
  expect(res).toEqual([100, 100])
})
