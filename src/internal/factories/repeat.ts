import { toArray } from '../operators/toArray'
import { isIterable, isAsyncIterable } from '../utils'

export function repeat<T>(item: Iterable<T>, count?: number): Iterable<T>
export function repeat<T>(item: AsyncIterable<T>, count?: number): AsyncIterable<T>
export function repeat<T>(item: Promise<T>, count?: number): AsyncIterable<T>
export function repeat<T>(item: T, count?: number): Iterable<T>
export function repeat(item: any, count: number = Infinity): any {
  if (isIterable(item)) {
    return repeatIterable(item, count)
  } else if (isAsyncIterable(item)) {
    return repeatAsyncIterable(item, count)
  } else if (item instanceof Promise) {
    return repeatPromise(item, count)
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

async function* repeatAsyncIterable<T>(iter: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count === 1) {
    yield* iter
    return
  }
  const buf = await toArray(iter)
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

async function* repeatPromise<T>(promise: Promise<T>, count: number): AsyncIterable<T> {
  const value = await promise
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
