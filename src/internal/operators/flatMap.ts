type FlatMapFunction<T, R> = (iter: Iterable<T>) => Iterable<R>

export function flatMap<T, R>(f: (x: T) => Iterable<R>): FlatMapFunction<T, R> {
  return (iter: Iterable<T>) => flatMapImpl(iter, f)
}

function* flatMapImpl<T, R>(iter: Iterable<T>, f: (x: T) => Iterable<R>): Iterable<R> {
  for (const value of iter) {
    yield* f(value)
  }
}
