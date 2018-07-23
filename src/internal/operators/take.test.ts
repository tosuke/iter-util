import { pipe, collect, take } from '@'

test('take', () => {
  const res = [0, 1, 2, 3][pipe](
    take(2),
    collect,
  )
  expect(res).toEqual([0, 1])
})
