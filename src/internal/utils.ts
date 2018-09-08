export type IterableType<Iter extends Iterable<any>> = Iter extends Iterable<infer T> ? T : never
export type OperatorFunction<T, S> = (iter: Iterable<T>) => S
export type UnaryOperatorFunction<T, R> = OperatorFunction<T, Iterable<R>>
export type MonoOperatorFunction<T> = UnaryOperatorFunction<T, T>

export function isIterable<T = any>(x: any): x is Iterable<T> {
  return x[Symbol.iterator] != null
}

export function sleep(ms: number): Promise<void> {
  return new Promise<void>(res => setTimeout(res, ms))
}
