import { timer } from '../utils'

export async function* interval(ms: number): AsyncIterable<number> {
  let counter = 0
  while (true) {
    yield counter++
    await timer(ms)
  }
}
