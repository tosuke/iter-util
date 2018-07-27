import { sleep } from '../utils'

export async function* interval(ms: number): AsyncIterable<number> {
  let counter = 0
  while (true) {
    await sleep(ms)
    yield counter++
  }
}
