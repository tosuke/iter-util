import { pipe, interval, take, collect, skip } from '@'

test('skip iterable', () => {
  const res = [0, 1, 2, 3][pipe](
    skip(2),
    collect,
  )
  expect(res).toEqual([2, 3])
})

test('skip asyncIterable', async () => {
  const res = await interval(100)[pipe](
    take(4),
    skip(2),
    collect,
  )
  expect(res).toEqual([2, 3])
})
