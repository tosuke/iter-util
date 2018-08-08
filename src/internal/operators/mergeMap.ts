import { AnyIterable, isIterable, isAsyncIterable } from '../utils'

type MergeMapFunction<T, R> = (iter: AnyIterable<T>) => AsyncIterable<R>
interface TaskResult<T> {
  key: number
  source: AsyncIterator<T> | null
  value: T
  done: boolean
}

export function mergeMap<T, R>(
  f: (x: T) => AnyIterable<R> | Promise<R> | R,
  maxConcurrent: number = 100,
): MergeMapFunction<T, R> {
  return (iter: AnyIterable<T>) => mergeImpl(iter, f, maxConcurrent)
}

async function* mergeImpl<T, R>(
  iter: AnyIterable<T>,
  f: (x: T) => AnyIterable<R> | Promise<R> | R,
  maxConcurrent: number,
): AsyncIterable<any> {
  const masterItor = getAsyncIterator(iter)

  const sources = new Set<AsyncIterator<any>>()
  const tasks = new Map<number, Promise<TaskResult<any>>>()
  let taskCounter = 0

  function addTask(key: number, src: Promise<any> | AsyncIterator<any>) {
    let task: Promise<TaskResult<any>>
    if (src instanceof Promise) {
      task = src.then(value => ({
        key,
        source: null,
        value,
        done: false,
      }))
    } else {
      task = src.next().then(result => ({
        key,
        source: src,
        ...result,
      }))
    }
    tasks.set(key, task)
  }

  sources.add(masterItor)
  addTask(taskCounter++, masterItor)

  while (true) {
    const result = await Promise.race(tasks.values())
    if (sources.has(masterItor) && tasks.size <= maxConcurrent) {
      addTask(taskCounter++, masterItor)
    }
    tasks.delete(result.key)
    if (result.done) {
      if (result.source) {
        sources.delete(result.source)
      }
    } else {
      if (result.source) {
        if (result.source === masterItor) {
          const value = f(result.value)
          if (isAsyncIterable(value)) {
            const itor = value[Symbol.asyncIterator]()
            sources.add(itor)
            addTask(taskCounter++, itor)
          } else if (value instanceof Promise) {
            addTask(taskCounter++, value)
          } else if (isIterable(value)) {
            yield* value
          } else {
            yield value
          }
        } else {
          addTask(taskCounter++, result.source)
          yield result.value
        }
      } else {
        yield result.value
      }
    }
    if (!sources.size && !tasks.size) break
  }
}

function getAsyncIterator<T>(iter: Iterable<T> | AsyncIterable<T>): AsyncIterator<T> {
  if (isIterable<T>(iter)) {
    const itor = iter[Symbol.iterator]()
    return {
      next() {
        try {
          return Promise.resolve(itor.next())
        } catch (err) {
          return Promise.reject(err)
        }
      },
    }
  } else {
    return iter[Symbol.asyncIterator]()
  }
}
