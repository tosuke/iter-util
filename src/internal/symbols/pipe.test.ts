import { pipe } from './pipe'
import { map, collect } from '@'

test('pipe', () => {
  const result = [1, 2, 3][pipe](
    map(a => a * 2),
    map(a => a + 1),
    collect,
  )
  expect(result).toEqual([3, 5, 7])
})
