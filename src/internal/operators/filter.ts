import { isIterable, AnyIterable } from '../utils'

type FilterFunction<T, U extends T> = <Iter extends AnyIterable<T>>(
  iter: Iter,
) => Iter extends Iterable<T> ? Iterable<U> : AsyncIterable<U>

export function filter<T>(cond: (x: T) => boolean): FilterFunction<T, T>
export function filter<T, U extends T>(cond: (x: T) => x is U): FilterFunction<T, U>
export function filter<T>(cond: (x: T) => any): FilterFunction<T, T> {
  return <FilterFunction<T, any>>(
    ((iter: AnyIterable<T>) => (isIterable<T>(iter) ? filterSync(iter, cond) : filterAsync(iter, cond)))
  )
}

function* filterSync<T>(iter: Iterable<T>, cond: (x: T) => boolean): Iterable<T> {
  for (const value of iter) {
    if (cond(value)) {
      yield value
    }
  }
}

async function* filterAsync<T>(iter: AsyncIterable<T>, cond: (x: T) => boolean): AsyncIterable<T> {
  for await (const value of iter) {
    if (cond(value)) {
      yield value
    }
  }
}
