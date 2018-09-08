import { UnaryOperatorFunction } from '../utils'

type MapFunction<T, U> = UnaryOperatorFunction<T, U>
export function map<T, U>(func: (x: T) => U): MapFunction<T, U> {
  return iter => mapImpl(iter, func)
}

function* mapImpl<T, U>(iter: Iterable<T>, func: (x: T) => U): Iterable<U> {
  for (const value of iter) {
    yield func(value)
  }
}
