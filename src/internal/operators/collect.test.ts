import { pipe, interval, take, collect } from '@'

test('collect iterable', () => {
  const res = collect([0, 1, 2, 3])
  expect(res).toEqual([0, 1, 2, 3])
})

test('collect asyncIterable', async () => {
  const res = await interval(100)[pipe](
    take(4),
    collect,
  )
  expect(res).toEqual([0, 1, 2, 3])
})
