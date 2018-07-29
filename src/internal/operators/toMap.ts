import { isIterable, AnyIterable } from '../utils'

type ToMapReturnType<Iter extends AnyIterable<[any, any]>> = Iter extends AnyIterable<[infer Key, infer Value]>
  ? (Iter extends Iterable<any> ? Map<Key, Value> : Promise<Map<Key, Value>>)
  : never

export function toMap() {
  return toMapImpl
}

function toMapImpl<Iter extends AnyIterable<[any, any]>>(iter: Iter): ToMapReturnType<Iter> {
  return <ToMapReturnType<Iter>>(isIterable(iter) ? toMapSync(iter) : toMapAsync(iter as AsyncIterable<any>))
}

function toMapSync<Iter extends Iterable<[any, any]>>(iter: Iter): Map<any, any> {
  return new Map(iter)
}

async function toMapAsync<Iter extends AsyncIterable<[any, any]>>(iter: Iter): Promise<Map<any, any>> {
  const map = new Map<any, any>()
  for await (const [key, value] of iter) {
    map.set(key, value)
  }
  return map
}
