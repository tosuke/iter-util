import { isIterable, AnyIterable } from '../utils'

type ForeachFunction<T, U> = <Iter extends AnyIterable<T>>(
  iter: Iter,
) => Iter extends AsyncIterable<any> ? Promise<void> : (U extends Promise<any> ? Promise<void> : void)

export function forEach<T, U>(func: (x: T) => U): ForeachFunction<T, U> {
  return <ForeachFunction<T, U>>(
    ((iter: AsyncIterable<T>) => (isIterable<T>(iter) ? forEachToIter(iter, func) : forEachToAsyncIter(iter, func)))
  )
}

function forEachToIter<T>(iter: Iterable<T>, func: (x: T) => any): void | Promise<void> {
  const iterator = iter[Symbol.iterator]()
  while (true) {
    const res = iterator.next()
    if (res.done) break
    const value = func(res.value)
    if (value instanceof Promise) {
      return value.then(() => forEachToIterContinueWithPromise(iterator, func))
    }
  }
}

async function forEachToIterContinueWithPromise<T>(iter: Iterator<T>, func: (x: T) => any): Promise<void> {
  while (true) {
    const res = iter.next()
    if (res.done) break
    await func(res.value)
  }
}

async function forEachToAsyncIter<T>(iter: AsyncIterable<T>, func: (x: T) => any): Promise<void> {
  for await (const value of iter) {
    await func(value)
  }
}
