type UF<T, U> = (x: T) => U
function pipeFunc<T>(this: T): T
function pipeFunc<T, A>(this: T, ...funcs: [UF<T, A>]): A
function pipeFunc<T, A, B>(this: T, ...funcs: [UF<T, A>, UF<A, B>]): B
function pipeFunc<T, A, B, C>(this: T, ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>]): C
function pipeFunc<T, A, B, C, D>(this: T, ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>]): D
function pipeFunc<T, A, B, C, D, E>(this: T, ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>]): E
function pipeFunc<T, A, B, C, D, E, F>(
  this: T,
  ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>, UF<E, F>]
): F
function pipeFunc<T, A, B, C, D, E, F, G>(
  this: T,
  ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>, UF<E, F>, UF<F, G>]
): G
function pipeFunc<T, A, B, C, D, E, F, G, H>(
  this: T,
  ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>, UF<E, F>, UF<F, G>, UF<G, H>]
): H
function pipeFunc<T, A, B, C, D, E, F, G, H, I>(
  this: T,
  ...funcs: [UF<T, A>, UF<A, B>, UF<B, C>, UF<C, D>, UF<D, E>, UF<E, F>, UF<F, G>, UF<G, H>, UF<H, I>]
): I
function pipeFunc<T, U>(this: T, ...funcs: UF<any, any>[]): U {
  return funcs.reduce<any>((val, uf) => uf(val), this) as U
}

type a = typeof pipeFunc

export const pipe = Symbol('pipe')

declare global {
  interface Object {
    [pipe]: typeof pipeFunc
  }
  interface Array<T> {
    [pipe]: typeof pipeFunc
  }
  interface Iterable<T> {
    [pipe]: typeof pipeFunc
  }
  interface IterableIterator<T> {
    [pipe]: typeof pipeFunc
  }
  interface AsyncIterable<T> {
    [pipe]: typeof pipeFunc
  }
  interface AsyncIterableIterator<T> {
    [pipe]: typeof pipeFunc
  }
}

;(Object.prototype as any)[pipe] = pipeFunc
