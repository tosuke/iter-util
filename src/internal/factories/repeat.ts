import { isIterable } from '../utils'

export function repeat<T>(item: Iterable<T>, count?: number): Iterable<T>
export function repeat<T>(item: T, count?: number): Iterable<T>
export function repeat(item: any, count: number = Infinity): any {
  if (isIterable(item)) {
    return repeatIterable(item, count)
  } else {
    return repeatOthers(item, count)
  }
}

function* repeatIterable<T>(iter: Iterable<T>, count: number): Iterable<T> {
  if (count === 1) {
    yield* iter
    return
  }
  const buf = Array.from(iter)
  if (count === Infinity) {
    while (true) {
      yield* buf
    }
  } else {
    for (; count > 0; count--) {
      yield* buf
    }
  }
}

function* repeatOthers<T>(value: T, count: number): Iterable<T> {
  if (count === Infinity) {
    while (true) {
      yield value
    }
  } else {
    for (; count > 0; count--) {
      yield value
    }
  }
}
