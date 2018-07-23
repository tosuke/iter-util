import { pipe, interval, take, reduce } from '@'

test('reduce iterable', () => {
  const res = [0, 1, 2, 3][pipe](reduce((a, b) => a + b))
  expect(res).toBe(6)
})

test('reduce asyncIterable', async () => {
  const res = await interval(100)[pipe](
    take(4),
    reduce((a, b) => a + b),
  )
  expect(res).toBe(6)
})
