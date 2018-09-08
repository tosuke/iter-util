import { flatAll } from '../operators/flatAll'

type Unwrap<T> = T extends Iterable<infer S> ? S : T
type ConcatType<TS extends any[]> = Iterable<Unwrap<TS[number]>>

export function concat<TS extends any[]>(...values: TS): ConcatType<TS> {
  return flatAll()(values) as any
}
