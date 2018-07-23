import { pipe, collect, skip } from '@'

test('skip', () => {
  const res = [0, 1, 2, 3][pipe](
    skip(2),
    collect,
  )
  expect(res).toEqual([2, 3])
})
