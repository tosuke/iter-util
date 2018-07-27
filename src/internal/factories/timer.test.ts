import { pipe, take, toArray, timer } from '@'

test('timer', () => {
  const res = timer(200, 100)[pipe](
    take(4),
    toArray,
  )
  expect(res).resolves.toEqual([200, 100, 100, 100])
})
