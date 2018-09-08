import { pipe, toMap } from '@'

test('toMap() sync', () => {
  const map = new Map<number, string>()
  map.set(0, 'foo')
  map.set(1, 'bar')

  const res = map.entries()[pipe](toMap())
  expect(res).toEqual(expect.any(Map))
  expect(res.get(0)).toBe('foo')
  expect(res.get(1)).toBe('bar')
})
