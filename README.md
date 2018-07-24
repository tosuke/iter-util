# Iter-utils: A composable, tree-shakable iterator extensions

[![CircleCI](https://circleci.com/gh/Tosuke/iter-util/tree/master.svg?style=svg)](https://circleci.com/gh/Tosuke/iter-util/tree/master)

## Example
```js
import { pipe, map, filter } from 'iter-utils'

const dest = source[pipe](
  map(x => ...),
  filter(x => ...)
)

for(const value of dest) {
  ...
}
```