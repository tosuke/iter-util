import { pipe } from './pipe'
import { map, toArray } from '@'

test('pipe', () => {
  const result = [1, 2, 3][pipe](
    map(a => a * 2),
    map(a => a + 1),
    toArray(),
  )
  expect(result).toEqual([3, 5, 7])
})
