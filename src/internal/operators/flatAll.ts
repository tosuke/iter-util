import { IterableType } from '../utils'
import { flatMap } from './flatMap'

export function flatAll() {
  return flatAllImpl
}

function flatAllImpl<Iter extends Iterable<any>>(iter: Iterable<Iter>): Iterable<IterableType<Iter>> {
  return flatMap<Iter, IterableType<Iter>>(id => id)(iter)
}
