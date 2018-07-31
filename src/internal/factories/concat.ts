import { flatAll } from '../operators/flatAll'
import { concatAll } from '../operators/concatAll'
import { isAsyncIterable, AnyIterable } from '../utils'

type AsyncType<T> = AsyncIterable<T> | Promise<T>
type Unwrap<T> = T extends AnyIterable<infer S> | Promise<infer S> ? S : T
type IsAsyncType<T> = T extends AsyncType<any> ? 'true' : 'false'
type ConcatType<TS extends any[]> = 'true' extends IsAsyncType<TS[number]>
  ? AsyncIterable<Unwrap<TS[number]>>
  : Iterable<Unwrap<TS[number]>>

function isAsyncType(x: any): x is AsyncType<any> {
  return x instanceof Promise || isAsyncIterable(x)
}

export function concat<TS extends any[]>(...values: TS): ConcatType<TS> {
  if (values.some(isAsyncType)) {
    return concatAll()(values) as any
  } else {
    return flatAll()(values) as any
  }
}
