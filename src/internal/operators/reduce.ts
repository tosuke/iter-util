import { isIterable, AnyIterable } from '../utils'

type ReduceFunction<T, U> = <Iter extends AnyIterable<T>>(iter: Iter) => Iter extends Iterable<T> ? U : Promise<U>

export function reduce<T, U = T>(reducer: (previous: U, current: T) => U, initialValue?: U): ReduceFunction<T, U> {
  return <ReduceFunction<T, U>>(
    ((iter: AnyIterable<T>) =>
      isIterable<T>(iter) ? reduceSync(iter, reducer, initialValue) : reduceAsync(iter, reducer, initialValue))
  )
}

function reduceSync<T, U>(iter: Iterable<T>, reducer: (previos: U, current: T) => U, init?: any): U {
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

async function reduceAsync<T, U>(
  iter: AsyncIterable<T>,
  reducer: (previos: U, current: T) => U,
  init?: any,
): Promise<U> {
  const iterator = iter[Symbol.asyncIterator]()
  if (init == undefined) {
    const res = await iterator.next()
    if (res.done) throw new Error('Reduce of empty array with no initial value')
    init = res.value
  }
  let result: U = init
  while (true) {
    const res = await iterator.next()
    if (res.done) break
    result = reducer(result, res.value)
  }
  return result
}
