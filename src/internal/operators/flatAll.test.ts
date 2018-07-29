import { pipe, toArray, flatAll } from '@'

test('flatAll()', () => {
  const res = [[0, 1], [2, 3]][pipe](
    flatAll(),
    toArray(),
  )
  expect(res).toEqual([0, 1, 2, 3])
})
