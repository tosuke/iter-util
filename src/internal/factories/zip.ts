import { AnyIterable, isIterable } from '../utils'

type UnIter<Iter> = Iter extends AnyIterable<infer S> ? S : never
type IsAsyncIterable<T> = T extends AsyncIterable<any> ? 'true' : 'false'
type ZipType<IterUnion, Tuple extends any[]> = 'true' extends IsAsyncIterable<IterUnion>
  ? AsyncIterable<Tuple>
  : Iterable<Tuple>
type AI = AnyIterable<any>

export function zip<A extends AI>(...iter: [A]): ZipType<A, [UnIter<A>]>
export function zip<A extends AI, B extends AI>(...iter: [A, B]): ZipType<A | B, [UnIter<A>, UnIter<B>]>
export function zip<A extends AI, B extends AI, C extends AI>(
  ...iter: [A, B, C]
): ZipType<A | B | C, [UnIter<A>, UnIter<B>, UnIter<C>]>
export function zip<A extends AI, B extends AI, C extends AI, D extends AI>(
  ...iter: [A, B, C, D]
): ZipType<A | B | C | D, [UnIter<A>, UnIter<B>, UnIter<C>, UnIter<D>]>
export function zip<A extends AI, B extends AI, C extends AI, D extends AI, E extends AI>(
  ...iter: [A, B, C, D, E]
): ZipType<A | B | C | D | E, [UnIter<A>, UnIter<B>, UnIter<C>, UnIter<D>, UnIter<E>]>
export function zip<A extends AI, B extends AI, C extends AI, D extends AI, E extends AI, F extends AI>(
  ...iter: [A, B, C, D, E, F]
): ZipType<A | B | C | D | E | F, [UnIter<A>, UnIter<B>, UnIter<C>, UnIter<D>, UnIter<E>, UnIter<F>]>
export function zip<TS extends any[]>(...iter: AnyIterable<any>[]): AnyIterable<TS> {
  if (iter.every(i => isIterable(i))) {
    return zipSync(iter as Iterable<any>[])
  } else {
    return zipAsync(iter as AsyncIterable<any>[])
  }
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

async function* zipAsync<TS extends any[]>(iter: AnyIterable<any>[]): AsyncIterable<TS> {
  let done = false
  const nexts = iter.map(i => {
    if (isIterable(i)) {
      const itor = i[Symbol.iterator]()
      return () => {
        const res = itor.next()
        done = res.done
        return done ? null : res.value
      }
    } else {
      const itor = i[Symbol.asyncIterator]()
      return () =>
        itor.next().then(res => {
          done = res.done
          return done ? null : res.value
        })
    }
  })

  while (true) {
    const res = await Promise.all(nexts.map(n => n()))
    if (done) break
    yield res as TS
  }
}
