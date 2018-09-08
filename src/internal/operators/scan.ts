import { MonoOperatorFunction } from '../utils'

type ScanFunction<T> = MonoOperatorFunction<T>

export function scan<T>(accumulator: (acc: T, value: T) => T, init?: T): ScanFunction<T>
export function scan<T, U>(accumulator: (acc: U, value: T) => U, init: U): ScanFunction<U> {
  return iter => scanImpl(iter, accumulator as any, init)
}

function* scanImpl<T, U>(iter: Iterable<T>, accumulator: (acc: U, value: T) => U, init?: U): Iterable<U> {
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
