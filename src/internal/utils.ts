export type AnyIterable<T> = Iterable<T> | AsyncIterable<T>
export type AnyIterableType<Iter extends AnyIterable<any>> = Iter extends AnyIterable<infer T> ? T : never

export function isIterable<T = any>(x: any): x is Iterable<T> {
  return x[Symbol.iterator] != null
}

export function isAsyncIterable<T = any>(x: any): x is AsyncIterable<T> {
  return x[Symbol.asyncIterator] != null
}
