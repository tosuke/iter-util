import { isIterable, AnyIterable, MonoOperatorFunction } from '../utils'

type ScanFunction<T> = MonoOperatorFunction<T>

export function scan<T>(accumulator: (acc: T, value: T) => T, init?: T): ScanFunction<T>
export function scan<T, U>(accumulator: (acc: U, value: T) => U, init: U): ScanFunction<U> {
  return <ScanFunction<any>>(
    ((iter: AnyIterable<T>) =>
      isIterable<T>(iter) ? scanSync(iter, accumulator, init) : scanAsync(iter, accumulator, init))
  )
}

function* scanSync<T, U>(iter: Iterable<T>, accumulator: (acc: U, value: T) => U, init?: U): Iterable<U> {
  const iterator = iter[Symbol.iterator]()
  if (init == undefined) {
    const res = iterator.next()
    if (res.done) return
    init = (res.value as any) as U
  }

  yield init
  while (true) {
    const res = iterator.next()
    if (res.done) return
    yield (init = accumulator(init, res.value))
  }
}

async function* scanAsync<T, U>(
  iter: AsyncIterable<T>,
  accumulator: (acc: U, value: T) => U,
  init?: U,
): AsyncIterable<U> {
  const iterator = iter[Symbol.asyncIterator]()
  if (init == undefined) {
    const res = await iterator.next()
    if (res.done) return
    init = (res.value as any) as U
  }

  yield init
  while (true) {
    const res = await iterator.next()
    if (res.done) return
    yield (init = accumulator(init, res.value))
  }
}
