import { UnaryOperatorFunction, operator } from '../utils'

type MapFunction<T, U> = UnaryOperatorFunction<T, U>
export function map<T, U>(func: (x: T) => U): MapFunction<T, U> {
  return operator<MapFunction<T, U>>(iter => mapSync(iter, func), iter => mapAsync(iter, func))
}

function* mapSync<T, U>(iter: Iterable<T>, func: (x: T) => U): Iterable<U> {
  for (const value of iter) {
    yield func(value)
  }
}

async function* mapAsync<T, U>(iter: AsyncIterable<T>, func: (x: T) => U): AsyncIterable<U> {
  for await (const value of iter) {
    yield func(value)
  }
}
