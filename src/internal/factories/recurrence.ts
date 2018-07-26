export function* recurrence<TS extends any[]>(generator: (...state: TS) => TS[-1], ...init: TS): Iterable<TS[-1]> {
  while (true) {
    const value = generator(...init)
    yield init.shift()
    init.push(value)
  }
}
