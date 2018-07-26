import { pipe, delay, collect, scan } from '@'

test('scan sync', () => {
  const res = [1, 2, 3, 4][pipe](
    scan((x, y) => x + y),
    collect,
  )
  expect(res).toEqual([1, 3, 6, 10])
})

test('scan async', () => {
  const res = [1, 2, 3, 4][pipe](
    delay(100),
    scan((x, y) => x + y),
    collect,
  )
  expect(res).resolves.toEqual([1, 3, 6, 10])
})
