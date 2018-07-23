import { pipe, interval, take, forEach } from '@'

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

function timer(ms: number): Promise<void> {
  return new Promise<void>(res => setTimeout(res, ms))
}

test('forEach asyncIterable', async () => {
  let res: number[] = []
  const asyncIter = interval(100)[pipe](take(4))
  await forEach((n: number) => {
    res.push(n)
  })(asyncIter)
  expect(res).toEqual([0, 1, 2, 3])
})
