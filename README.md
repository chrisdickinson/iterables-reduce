# @iterables/reduce

A reduce generator for iterators.

```javascript
const reduce = require('@iterables/reduce')

const value = reduce(function * () {
  yield 1
  yield 2
}(), (acc, xs) => acc + xs)

console.log(value) // 3
```

## Installation

```
$ npm install --save @iterables/reduce
```

## API

### `reduce(iterable, fn[, initial]) -> Value`

* `iterable`: any `Iterator` — a generator instance, `Array`, `Map`, `String`, or `Set`
* `fn`: A function taking `acc`, `xs`, `idx`, and `all` and returning any value.
    * `acc`: the accumulator returned by `fn`. The first value is the first item from the iterable
      if `initial` is not given.
    * `xs`: an item from `iterable`.
    * `idx`: a number reflecting the index of the current item.
    * `all`: the full `iterable` object.

Returns a value representing the reduction of the input iterator.

## License

MIT

