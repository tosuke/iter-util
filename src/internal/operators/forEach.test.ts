import { forEach } from '@'

test('forEach iterable', () => {
  let res: number[] = []
  forEach((n: number) => {
    res.push(n)
  })([0, 1, 2, 3])
  expect(res).toEqual([0, 1, 2, 3])
})
