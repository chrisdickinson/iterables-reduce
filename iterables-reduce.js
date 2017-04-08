'use strict'

module.exports = reduce

function reduce (iterable, fn, initial) {
  if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('expected an iterable as the first argument')
  }

  if (typeof fn !== 'function') {
    throw new TypeError('expected second argument to be a function')
  }

  let idx = 0
  let acc = initial
  const iter = iterable[Symbol.iterator]()
  if (arguments.length === 2) {
    ++idx
    const cursor = iter.next()
    if (cursor.done) {
      throw new TypeError('Reduce of empty iterable with no initial value')
    }
    acc = cursor.value
  }

  for (const xs of iter) {
    acc = fn(acc, xs, idx++, iterable)
  }

  return acc
}
