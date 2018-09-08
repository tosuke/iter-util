export function toArray() {
  return toArrayImpl
}

function toArrayImpl<T>(iter: Iterable<T>): T[] {
  return Array.from<T>(iter)
}
