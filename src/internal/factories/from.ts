import { isIterable } from '../utils'

export function from<T>(item: Iterable<T>): Iterable<T>
export function from<T>(item: T): Iterable<T>
export function from(item: any): any {
  if (isIterable(item)) {
    return item
  } else {
    return [item]
  }
}
