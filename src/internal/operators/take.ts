import { isIterable, AnyIterable, OperatorFunction } from '../utils'

type TakeFunction<T> = OperatorFunction<T, Iterable<T>, AsyncIterable<T>>

export function take<T>(n: number): TakeFunction<T> {
  return <TakeFunction<T>>(
    ((iter: AnyIterable<T>) => (isIterable<T>(iter) ? takeToIter(iter, n) : takeToAsyncIter(iter, n)))
  )
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
