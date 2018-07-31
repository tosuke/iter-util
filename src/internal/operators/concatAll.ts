import { AnyIterable } from '../utils'
import { concatMap } from './concatMap'

type AnyIterableOrPromiseType<T> = T extends AnyIterable<infer S> | Promise<infer S> ? S : T

export function concatAll() {
  return concatAllImpl
}

function concatAllImpl<T>(iter: AnyIterable<T>): AsyncIterable<AnyIterableOrPromiseType<T>> {
  return concatMap(id => id)(iter) as any
}
