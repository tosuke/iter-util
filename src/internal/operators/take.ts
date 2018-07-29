import { MonoOperatorFunction, operator } from '../utils'

type TakeFunction<T> = MonoOperatorFunction<T>

export function take<T>(n: number): TakeFunction<T> {
  return operator<TakeFunction<T>>(iter => takeToIter(iter, n), iter => takeToAsyncIter(iter, n))
}

function* takeToIter<T>(iter: Iterable<T>, n: number): Iterable<T> {
  for (const value of iter) {
    if (n-- <= 0) break
    yield value
  }
}

async function* takeToAsyncIter<T>(iter: AsyncIterable<T>, n: number): AsyncIterable<T> {
  for await (const value of iter) {
    if (n-- <= 0) break
    yield value
  }
}
