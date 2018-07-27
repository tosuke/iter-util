import { pipe, toArray, delay } from '@'

test('delay', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    toArray,
  )
  expect(res).resolves.toEqual([0, 1, 2, 3])
})
