import { pipe, delay, toSet } from '@'

test('toSet sync', () => {
  const set = new Set([0, 1, 1])
  const res = set.values()[pipe](toSet)
  expect(res).toEqual(expect.any(Set))
  expect(res.has(0)).toBe(true)
  expect(res.has(1)).toBe(true)
})

test('toSet sync', async () => {
  const set = new Set([0, 1, 1])
  const res = set.values()[pipe](
    delay(100),
    toSet,
  )
  expect(res).resolves.toEqual(expect.any(Set))
  const set2 = await res
  expect(set2.has(0)).toBe(true)
  expect(set2.has(1)).toBe(true)
})
