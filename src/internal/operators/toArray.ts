import { isIterable, AnyIterable, AnyIterableType } from '../utils'

type ToArrayReturnType<Iter extends AnyIterable<any>> = Iter extends Iterable<any>
  ? AnyIterableType<Iter>[]
  : Promise<AnyIterableType<Iter>[]>

export function toArray() {
  return toArrayImpl
}

function toArrayImpl<Iter extends AnyIterable<any>>(iter: Iter): ToArrayReturnType<Iter> {
  return <ToArrayReturnType<Iter>>(isIterable(iter) ? toArraySync(iter) : toArrayAsync(iter as AsyncIterable<any>))
}

function toArraySync<T>(iter: Iterable<T>): T[] {
  return Array.from<T>(iter)
}

async function toArrayAsync<T>(iter: AsyncIterable<T>): Promise<T[]> {
  let array = []
  for await (const value of iter) {
    array.push(value)
  }
  return array
}
