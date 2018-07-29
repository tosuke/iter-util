import { UnaryOperatorFunction, operator } from '../utils'

type FilterFunction<T, U extends T> = UnaryOperatorFunction<T, U>

export function filter<T>(cond: (x: T) => boolean): FilterFunction<T, T>
export function filter<T, U extends T>(cond: (x: T) => x is U): FilterFunction<T, U>
export function filter<T>(cond: (x: T) => any): FilterFunction<T, T> {
  return operator<FilterFunction<T, any>>(iter => filterSync(iter, cond), iter => filterAsync(iter, cond))
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
