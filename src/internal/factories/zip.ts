type Unwrap<Iter> = Iter extends Iterable<infer S> ? S : never
type ZipIterable<Iters extends Iterable<any>[]> = Iterable<{ [P in keyof Iters]: Unwrap<Iters[P]> }>

export function zip<Iters extends Iterable<any>[]>(...iter: Iters): ZipIterable<Iters> {
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
