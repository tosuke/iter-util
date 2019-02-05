type UF<T, U> = (x: T) => U

function pipeFunc<T, U>(this: T, ...funcs: UF<any, any>[]): U {
  return funcs.reduce<any>((val, uf) => uf(val), this) as U
}

type PipeT = {
  <T>(this: T): T
  <T, A>(this: T, ...f: [UF<T, A>]): A
  <T, A, B>(this: T, ...f: [UF<T, A>, UF<A, B>]): B
  <T, A, B, C>(this: T, ...f: [UF<T, A>, UF<A, B>, UF<B, C>]): C
  <T, A, B, C, D>(this: T, ...f: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>]): D
  <T, A, B, C, D, E>(this: T, ...f: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>]): E
  <T, A, B, C, D, E, F>(this: T, ...f: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>, UF<E, F>]): F
}

export const pipe = Symbol('pipe')

interface Pipable {
  [pipe]: PipeT
}

declare global {
  interface Object extends Pipable {
    [pipe]: PipeT
  }
  interface Array<T> extends Pipable {
    [pipe]: PipeT
  }
  interface Iterable<T> extends Pipable {
    [pipe]: PipeT
  }
  interface IterableIterator<T> extends Pipable {
    [pipe]: PipeT
  }
}

Object.defineProperty(Object.prototype, pipe, {
  configurable: false,
  enumerable: false,
  writable: false,
  value: pipeFunc,
})
