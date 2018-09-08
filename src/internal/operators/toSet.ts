import { IterableType } from '../utils'

export function toSet() {
  return toSetImpl
}

function toSetImpl<Iter extends Iterable<any>>(iter: Iter): Set<IterableType<Iter>> {
  return new Set(iter)
}
