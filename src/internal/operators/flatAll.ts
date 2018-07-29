import { flatMap } from './flatMap'

type IterableType<Iter extends Iterable<any>> = Iter extends Iterable<infer T> ? T : never

export function flatAll() {
  return flatAllImpl
}

function flatAllImpl<Iter extends Iterable<any>>(iter: Iterable<Iter>): Iterable<IterableType<Iter>> {
  return flatMap<Iter, IterableType<Iter>>(id => id)(iter)
}
