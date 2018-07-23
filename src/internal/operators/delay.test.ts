import { pipe, collect, delay } from '@'

test('delay', async () => {
  const res = await [0, 1, 2, 3][pipe](
    delay(100),
    collect,
  )
  expect(res).toEqual([0, 1, 2, 3])
})
