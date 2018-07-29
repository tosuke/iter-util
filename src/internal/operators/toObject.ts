import { isIterable, AnyIterable } from '../utils'

type ToObjectReturnType<Iter extends AnyIterable<[string, any]>> = Iter extends AnyIterable<[string, infer Value]>
  ? (Iter extends Iterable<any> ? { [key: string]: Value } : Promise<{ [key: string]: Value }>)
  : never

export function toObject() {
  return toObjectImpl
}
function toObjectImpl<Iter extends AnyIterable<[string, any]>>(iter: Iter): ToObjectReturnType<Iter> {
  return <ToObjectReturnType<Iter>>(isIterable(iter) ? toObjectSync(iter) : toObjectAsync(iter as AsyncIterable<any>))
}

function toObjectSync<Iter extends Iterable<[string, any]>>(iter: Iter): { [key: string]: any } {
  let obj: { [key: string]: any } = {}
  for (const [key, value] of iter) {
    obj[key] = value
  }
  return obj
}

async function toObjectAsync<Iter extends AsyncIterable<[string, any]>>(iter: Iter): Promise<{ [key: string]: any }> {
  let obj: { [key: string]: any } = {}
  for await (const [key, value] of iter) {
    obj[key] = value
  }
  return obj
}
