export function* recurrence<TS extends any[]>(
  generator: (...state: TS) => TS[number],
  ...init: TS
): Iterable<TS[number]> {
  while (true) {
    const value = generator(...init)
    yield init.shift()
    init.push(value)
  }
}
