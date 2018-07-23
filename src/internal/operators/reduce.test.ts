import { pipe, delay, reduce } from '@'

test('reduce iterable', () => {
  const res = [0, 1, 2, 3][pipe](reduce((a, b) => a + b))
  expect(res).toBe(6)
})

test('reduce asyncIterable', () => {
  const res = [0, 1, 2, 3][pipe](
    delay(100),
    reduce((a, b) => a + b),
  )
  expect(res).resolves.toBe(6)
})
