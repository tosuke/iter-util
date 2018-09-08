import { pipe, toObject } from '@'

test('toObject() sync', () => {
  const res = objectEntries({ a: 1, b: 2 })[pipe](toObject())
  expect(res).toEqual({ a: 1, b: 2 })
})

function* objectEntries<T>(obj: { [key: string]: T }): Iterable<[string, T]> {
  const keys = Object.keys(obj)
  for (const key of keys) {
    yield [key, obj[key]]
  }
}
