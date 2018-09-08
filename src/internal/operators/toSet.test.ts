import { pipe, toSet } from '@'

test('toSet() sync', () => {
  const set = new Set([0, 1, 1])
  const res = set.values()[pipe](toSet())
  expect(res).toEqual(expect.any(Set))
  expect(res.has(0)).toBe(true)
  expect(res.has(1)).toBe(true)
})
