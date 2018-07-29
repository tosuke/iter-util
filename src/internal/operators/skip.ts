import { MonoOperatorFunction, operator } from '../utils'

type SkipFunction<T> = MonoOperatorFunction<T>

export function skip<T>(n: number): SkipFunction<T> {
  return operator<SkipFunction<T>>(iter => skipToIter(iter, n), iter => skipToAsyncIter(iter, n))
}

function* skipToIter<T>(iter: Iterable<T>, n: number): Iterable<T> {
  let flag = false
  for (const value of iter) {
    if (flag || (flag = n-- <= 0)) {
      yield value
    }
  }
}
async function* skipToAsyncIter<T>(iter: AsyncIterable<T>, n: number): AsyncIterable<T> {
  let flag = false
  for await (const value of iter) {
    if (flag || (flag = n-- <= 0)) {
      yield value
    }
  }
}
