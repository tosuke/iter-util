import { OperatorFunction } from '../utils'

type ForeachFunction<T> = OperatorFunction<T, void>

export function forEach<T>(func: (x: T) => any): ForeachFunction<T> {
  return iter => forEachImpl(iter, func)
}

function forEachImpl<T>(iter: Iterable<T>, func: (x: T) => any): any {
  for (const val of iter) {
    func(val)
  }
}
