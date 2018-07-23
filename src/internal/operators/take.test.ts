import { pipe, interval, collect, take } from '@'

test('take iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    take(2),
    collect,
  )
  expect(res).toEqual([0, 1])
})

test('take asyncIterable', async () => {
  const res = await interval(100)[pipe](
    take(2),
    collect,
  )
  expect(res).toEqual([0, 1])
})
