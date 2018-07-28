import { isIterable, isAsyncIterable } from '../utils'

export function from<T>(item: Iterable<T>): Iterable<T>
export function from<T>(item: AsyncIterable<T>): AsyncIterable<T>
export function from<T>(item: Promise<T>): AsyncIterable<T>
export function from<T>(item: T): Iterable<T>
export function from(item: any): any {
  if (isIterable(item) || isAsyncIterable(item)) {
    return item
  } else if (item instanceof Promise) {
    return fromPromise(item)
  } else {
    return [item]
  }
}

async function* fromPromise<T>(item: Promise<T>): AsyncIterable<T> {
  yield await item
}
