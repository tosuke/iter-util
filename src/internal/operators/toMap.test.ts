import { pipe, delay, toMap } from '@'

test('toMap sync', () => {
  const map = new Map<number, string>()
  map.set(0, 'foo')
  map.set(1, 'bar')

  const res = map.entries()[pipe](toMap)
  expect(res).toEqual(expect.any(Map))
  expect(res.get(0)).toBe('foo')
  expect(res.get(1)).toBe('bar')
})

test('toMap async', async () => {
  const map = new Map<number, string>()
  map.set(0, 'foo')
  map.set(1, 'bar')

  const res = map.entries()[pipe](
    delay(100),
    toMap,
  )
  await expect(res).resolves.toEqual(expect.any(Map))
  const map2 = await res
  expect(map2.get(0)).toBe('foo')
  expect(map2.get(1)).toBe('bar')
})
