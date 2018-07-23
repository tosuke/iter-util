// polyfill
const S = Symbol

if (!('asyncIterator' in Symbol)) {
  Object.defineProperty(Symbol, 'asyncIterator', {
    value: S('asyncIterator'),
  })
}
