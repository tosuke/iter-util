import { collect } from './collect'

test('collect iterator', () => {
  const res = collect([1, 2, 3, 4])
  expect(res).toEqual([1, 2, 3, 4])
})
