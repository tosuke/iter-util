# Iter-utils: A composable, tree-shakable iterator extensions

[![CircleCI](https://circleci.com/gh/Tosuke/iter-util/tree/master.svg?style=svg)](https://circleci.com/gh/Tosuke/iter-util/tree/master)
[![codecov](https://codecov.io/gh/Tosuke/iter-util/branch/master/graph/badge.svg)](https://codecov.io/gh/Tosuke/iter-util)

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