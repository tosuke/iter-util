import { pipe } from '@'
import { reduce } from './reduce'

test('reduce', () => {
  const res = [1, 2, 3, 4][pipe](reduce((a, b) => a + b))
  expect(res).toEqual(10)
})
