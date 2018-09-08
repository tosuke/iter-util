import { MonoOperatorFunction } from '../utils'

type SkipFunction<T> = MonoOperatorFunction<T>

export function skip<T>(n: number): SkipFunction<T> {
  return iter => skipImpl(iter, n)
}

function* skipImpl<T>(iter: Iterable<T>, n: number): Iterable<T> {
  let flag = false
  for (const value of iter) {
    if (flag || (flag = n-- <= 0)) {
      yield value
    }
  }
}
