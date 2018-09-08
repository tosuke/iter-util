type ToObjectReturnType<Iter extends Iterable<[string, any]>> = Iter extends Iterable<[string, infer Value]>
  ? { [key: string]: Value }
  : never

export function toObject() {
  return toObjectImpl
}

function toObjectImpl<Iter extends Iterable<[string, any]>>(iter: Iter): ToObjectReturnType<Iter> {
  let obj: { [key: string]: any } = {}
  for (const [key, value] of iter) {
    obj[key] = value
  }
  return obj as any
}
