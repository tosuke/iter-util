import { isIterable } from '../utils'

type FlatMapFunction<T, R> = (iter: Iterable<T>) => Iterable<R>

export function flatMap<T, R>(f: (x: T) => Iterable<R> | R): FlatMapFunction<T, R> {
  return (iter: Iterable<T>) => flatMapImpl(iter, f)
}

function* flatMapImpl<T, R>(iter: Iterable<T>, f: (x: T) => Iterable<R> | R): Iterable<R> {
  for (const value of iter) {
    const ret = f(value)
    if (isIterable(ret)) {
      yield* ret
    } else {
      yield ret
    }
  }
}
