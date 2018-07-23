import { pipe, collect } from '@'
import { map } from './map'

test('map', () => {
  const res = [1, 2, 3][pipe](
    map(x => x * 2),
    collect,
  )
  expect(res).toEqual([2, 4, 6])
})
