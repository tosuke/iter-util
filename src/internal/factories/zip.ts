type UnIter<Iter> = Iter extends Iterable<infer S> ? S : never
type ZipType<Tuple extends any[]> = Iterable<Tuple>
type AI = Iterable<any>

export function zip<A extends AI>(...iter: [A]): ZipType<[UnIter<A>]>
export function zip<A extends AI, B extends AI>(...iter: [A, B]): ZipType<[UnIter<A>, UnIter<B>]>
export function zip<A extends AI, B extends AI, C extends AI>(
  ...iter: [A, B, C]
): ZipType<[UnIter<A>, UnIter<B>, UnIter<C>]>
export function zip<A extends AI, B extends AI, C extends AI, D extends AI>(
  ...iter: [A, B, C, D]
): ZipType<[UnIter<A>, UnIter<B>, UnIter<C>, UnIter<D>]>
export function zip<A extends AI, B extends AI, C extends AI, D extends AI, E extends AI>(
  ...iter: [A, B, C, D, E]
): ZipType<[UnIter<A>, UnIter<B>, UnIter<C>, UnIter<D>, UnIter<E>]>
export function zip<A extends AI, B extends AI, C extends AI, D extends AI, E extends AI, F extends AI>(
  ...iter: [A, B, C, D, E, F]
): ZipType<[UnIter<A>, UnIter<B>, UnIter<C>, UnIter<D>, UnIter<E>, UnIter<F>]>
export function zip<TS extends any[]>(...iter: Iterable<any>[]): Iterable<TS> {
  return zipSync(iter as Iterable<any>[])
}

function* zipSync<TS extends any[]>(iter: Iterable<any>[]): Iterable<TS> {
  let done = false
  const nexts = iter.map(i => {
    const itor = i[Symbol.iterator]()
    return () => {
      const res = itor.next()
      done = res.done
      return done ? null : res.value
    }
  })

  while (true) {
    const res = nexts.map(n => n())
    if (done) break
    yield res as TS
  }
}
