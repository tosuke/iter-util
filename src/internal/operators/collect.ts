import { isIterable, AnyIterable, AnyIterableType } from '../utils'

type CollectReturnType<Iter extends AnyIterable<any>> = Iter extends Iterable<any>
  ? AnyIterableType<Iter>[]
  : Promise<AnyIterableType<Iter>[]>

export function collect<Iter extends AnyIterable<any>>(iter: Iter): CollectReturnType<Iter> {
  return <CollectReturnType<Iter>>(isIterable(iter) ? collectSync(iter) : collectAsync(iter as AsyncIterable<any>))
}

function collectSync<T>(iter: Iterable<T>): T[] {
  let array = []
  for (const value of iter) {
    array.push(value)
  }
  return array
}

async function collectAsync<T>(iter: AsyncIterable<T>): Promise<T[]> {
  let array = []
  for await (const value of iter) {
    array.push(value)
  }
  return array
}
