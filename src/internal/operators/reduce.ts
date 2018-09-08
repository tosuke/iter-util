import { OperatorFunction } from '../utils'

type ReduceFunction<T, U> = OperatorFunction<T, U>

export function reduce<T, U = T>(reducer: (previous: U, current: T) => U, initialValue?: U): ReduceFunction<T, U> {
  return iter => reduceImpl(iter, reducer, initialValue)
}

function reduceImpl<T, U>(iter: Iterable<T>, reducer: (previos: U, current: T) => U, init?: any): U {
  const iterator = iter[Symbol.iterator]()
  if (init == undefined) {
    const res = iterator.next()
    if (res.done) throw new Error('Reduce of empty array with no initial value')
    init = res.value
  }
  let result: U = init
  while (true) {
    const res = iterator.next()
    if (res.done) break
    result = reducer(result, res.value)
  }
  return result
}
