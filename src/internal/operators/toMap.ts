type ToMapReturnType<Iter extends Iterable<[any, any]>> = Iter extends Iterable<[infer Key, infer Value]>
  ? Map<Key, Value>
  : never

export function toMap() {
  return toMapImpl
}

function toMapImpl<Iter extends Iterable<[any, any]>>(iter: Iter): ToMapReturnType<Iter> {
  return new Map(iter) as any
}
