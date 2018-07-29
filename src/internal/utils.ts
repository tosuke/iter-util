export type AnyIterable<T> = Iterable<T> | AsyncIterable<T>
export type AnyIterableType<Iter extends AnyIterable<any>> = Iter extends AnyIterable<infer T> ? T : never
export type OperatorFunction<T, IfIterable, IfAsyncIterable> = <Iter extends AnyIterable<T>>(
  iter: Iter,
) => Iter extends Iterable<T> ? IfIterable : IfAsyncIterable
export type UnaryOperatorFunction<T, R> = OperatorFunction<T, Iterable<R>, AsyncIterable<R>>
export type MonoOperatorFunction<T> = UnaryOperatorFunction<T, T>

type OperatorT<OF extends OperatorFunction<any, any, any>> = OF extends OperatorFunction<infer T, any, any> ? T : never
type OperatorIfIterable<OF extends OperatorFunction<any, any, any>> = OF extends OperatorFunction<
  any,
  infer IfIterable,
  any
>
  ? IfIterable
  : never
type OperatorIfAsyncIterable<OF extends OperatorFunction<any, any, any>> = OF extends OperatorFunction<
  any,
  any,
  infer IfAsyncIterable
>
  ? IfAsyncIterable
  : never
export function operator<OF extends OperatorFunction<any, any, any>>(
  ifIterable: (iter: Iterable<OperatorT<OF>>) => OperatorIfIterable<OF>,
  ifAsyncIterable: (iter: AsyncIterable<OperatorT<OF>>) => OperatorIfAsyncIterable<OF>,
): OF {
  return <OF>((iter: AnyIterable<any>) => (isIterable(iter) ? ifIterable(iter) : ifAsyncIterable(iter)))
}

export function isIterable<T = any>(x: any): x is Iterable<T> {
  return x[Symbol.iterator] != null
}

export function isAsyncIterable<T = any>(x: any): x is AsyncIterable<T> {
  return x[Symbol.asyncIterator] != null
}

export function sleep(ms: number): Promise<void> {
  return new Promise<void>(res => setTimeout(res, ms))
}
