import { sleep } from '../utils'

export async function* timer(dueTime: number, period: number): AsyncIterable<number> {
  await sleep(dueTime)
  yield dueTime
  while (true) {
    await sleep(period)
    yield period
  }
}
