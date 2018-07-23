import { isIterable, AnyIterable } from '../utils'

type MapFunction<T, U> = <Iter extends AnyIterable<T>>(
  x: Iter,
) => Iter extends Iterable<T> ? Iterable<U> : AsyncIterable<U>

export function map<T, U>(func: (x: T) => U): MapFunction<T, U> {
  return <MapFunction<T, U>>(
    ((iter: Iterable<T> | AsyncIterable<T>) => (isIterable<T>(iter) ? mapSync(iter, func) : mapAsync(iter, func)))
  )
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
