import { forEach } from '@'

test('forEach(Iterable -> void)', () => {
  let res: number[] = []
  forEach((n: number) => {
    res.push(n)
  })([1, 2, 3])
  expect(res).toEqual([1, 2, 3])
})

test('forEach(Iterable -> Promise)', async () => {
  let res: number[] = []
  await forEach(async (n: number) => {
    await timer(n * 100)
    res.push(n)
  })([1, 2, 3])
  expect(res).toEqual([1, 2, 3])
})

function timer(ms: number): Promise<void> {
  return new Promise<void>(res => setTimeout(res, ms))
}
