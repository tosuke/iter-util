import { AnyIterable, sleep } from '../utils'

type DelayFunction<T> = (iter: AnyIterable<T>) => AsyncIterable<T>

export function delay<T>(ms: number): DelayFunction<T> {
  return (iter: AnyIterable<T>) => delayImpl(iter, ms)
}

async function* delayImpl<T>(iter: AnyIterable<T>, ms: number): AsyncIterable<T> {
  for await (const value of iter) {
    await sleep(ms)
    yield value
  }
}
