import { pipe, collect, delay } from '@'

test('delay', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    collect,
  )
  expect(res).resolves.toEqual([0, 1, 2, 3])
})
