export function* range(start: number, count: number): Iterable<number> {
  for (; count > 0; count--) yield start++
}
