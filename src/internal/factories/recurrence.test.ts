import { pipe, take, collect, recurrence } from '@'

test('recurrence fibonacci', () => {
  const fibonacci = recurrence((a, b) => a + b, 1, 1)
  const res = fibonacci[pipe](
    take(5),
    collect,
  )
  expect(res).toEqual([1, 1, 2, 3, 5])
})

test('recurrence', () => {
  const series = recurrence((a, b) => a * 2 + b, 1, 1)
  const res = series[pipe](
    take(5),
    collect,
  )
  expect(res).toEqual([1, 1, 3, 5, 11])
})
