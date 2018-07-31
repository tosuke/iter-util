import { OperatorFunction, AnyIterable, isAnyIterable, isIterable } from '../utils'

type ConcatMapFunction<T, R> = OperatorFunction<T, AsyncIterable<R>, AsyncIterable<R>>

export function concatMap<T, R>(f: (x: T) => AnyIterable<R> | Promise<R> | R): ConcatMapFunction<T, R> {
  return <ConcatMapFunction<T, R>>((iter: AnyIterable<T>) => concatMapImpl(iter, f))
}

async function* concatMapImpl<T, R>(
  iter: AnyIterable<T>,
  f: (x: T) => AnyIterable<R> | Promise<R> | R,
): AsyncIterable<R> {
  const itor = isIterable<T>(iter) ? iter[Symbol.iterator]() : iter[Symbol.asyncIterator]()
  while (true) {
    const res = await itor.next()
    if (res.done) break
    const val = f(res.value)
    if (isAnyIterable(val)) {
      yield* val
    } else {
      yield await val
    }
  }
}
