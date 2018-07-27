import { pipe, delay, toObject } from '@'

test('toObject sync', () => {
  const res = Object.entries({ a: 1, b: 2 })[pipe](toObject)
  expect(res).toEqual({ a: 1, b: 2 })
})

test('toObject async', () => {
  const res = Object.entries({ a: 1, b: 2 })[pipe](
    delay(100),
    toObject,
  )
  expect(res).resolves.toEqual({ a: 1, b: 2 })
})
