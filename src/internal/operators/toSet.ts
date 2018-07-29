import { isIterable, AnyIterable, AnyIterableType } from '../utils'

type ToSetReturnType<Iter extends AnyIterable<any>> = Iter extends Iterable<any>
  ? Set<AnyIterableType<Iter>>
  : Promise<Set<AnyIterableType<Iter>>>

export function toSet() {
  return toSetImpl
}
function toSetImpl<Iter extends AnyIterable<any>>(iter: Iter): ToSetReturnType<Iter> {
  return <ToSetReturnType<Iter>>(isIterable(iter) ? toSetSync(iter) : toSetAsync(iter as AsyncIterable<any>))
}

function toSetSync<Iter extends Iterable<any>>(iter: Iter): Set<any> {
  return new Set(iter)
}

async function toSetAsync<Iter extends AsyncIterable<any>>(iter: Iter): Promise<Set<any>> {
  const set = new Set()
  for await (const value of iter) {
    set.add(value)
  }
  return set
}
