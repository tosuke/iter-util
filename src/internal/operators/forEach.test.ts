import { pipe, delay, forEach } from '@'
import { timer } from '../utils'

test('forEach iterable', () => {
  let res: number[] = []
  forEach((n: number) => {
    res.push(n)
  })([0, 1, 2, 3])
  expect(res).toEqual([0, 1, 2, 3])
})

test('forEach iterable with async functions', async () => {
  let res: number[] = []
  await forEach(async (n: number) => {
    await timer(n * 100)
    res.push(n)
  })([0, 1, 2, 3])
  expect(res).toEqual([0, 1, 2, 3])
})

test('forEach asyncIterable', async () => {
  let res: number[] = []
  const asyncIter = [0, 1, 2, 3][pipe](delay(100))
  await forEach((n: number) => {
    res.push(n)
  })(asyncIter)
  expect(res).toEqual([0, 1, 2, 3])
})
