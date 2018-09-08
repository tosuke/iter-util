import { pipe, toArray, scan } from '@'

test('scan sync', () => {
  const res = [1, 2, 3, 4][pipe](
    scan((x, y) => x + y),
    toArray(),
  )
  expect(res).toEqual([1, 3, 6, 10])
})
