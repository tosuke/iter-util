import { pipe, delay, toArray, from } from '@'

test('from iterable', () => {
  const res = from([0, 1, 2])[pipe](toArray())
  expect(res).toEqual([0, 1, 2])
})

test('from asyncIterable', async () => {
  const asyncIterable = [0, 1, 2][pipe](delay(100))
  const res = from(asyncIterable)[pipe](toArray())
  await expect(res).resolves.toEqual([0, 1, 2])
})

test('from promise', async () => {
  const res = from(Promise.resolve(1))[pipe](toArray())
  await expect(res).resolves.toEqual([1])
})

test('from primitive', () => {
  const res = from(1)[pipe](toArray())
  expect(res).toEqual([1])
})
