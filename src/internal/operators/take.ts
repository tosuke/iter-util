import { MonoOperatorFunction } from '../utils'

type TakeFunction<T> = MonoOperatorFunction<T>

export function take<T>(n: number): TakeFunction<T> {
  return iter => takeImpl(iter, n)
}

function* takeImpl<T>(iter: Iterable<T>, n: number): Iterable<T> {
  for (const value of iter) {
    if (n-- <= 0) break
    yield value
  }
}
