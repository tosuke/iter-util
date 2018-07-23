export type AnyIterable<T> = Iterable<T> | AsyncIterable<T>
export type AnyIterableType<Iter extends AnyIterable<any>> = Iter extends AnyIterable<infer T> ? T : never
export type OperatorFunction<T, IfIterable, IfAsyncIterable> = <Iter extends AnyIterable<T>>(
  iter: Iter,
) => Iter extends Iterable<T> ? IfIterable : IfAsyncIterable

export function isIterable<T = any>(x: any): x is Iterable<T> {
  return x[Symbol.iterator] != null
}

export function isAsyncIterable<T = any>(x: any): x is AsyncIterable<T> {
  return x[Symbol.asyncIterator] != null
}

export function timer(ms: number): Promise<void> {
  return new Promise<void>(res => setTimeout(res, ms))
}
