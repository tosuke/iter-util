import { pipe, range, toArray, flatMap } from '@'

test('flatMap', () => {
  const res = [0, 1, 2, 3][pipe](
    flatMap(x => range(1, x)),
    toArray(),
  )
  expect(res).toEqual([1, 1, 2, 1, 2, 3])
})
