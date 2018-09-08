import { pipe, reduce } from '@'

test('reduce iterable', () => {
  const res = [0, 1, 2, 3][pipe](reduce((a, b) => a + b))
  expect(res).toBe(6)
})
