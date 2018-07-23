export async function* interval(ms: number): AsyncIterable<number> {
  let counter = 0
  while (true) {
    yield counter++
    await timer(ms)
  }
}

function timer(ms: number): Promise<void> {
  return new Promise<void>(res => setTimeout(res, ms))
}
