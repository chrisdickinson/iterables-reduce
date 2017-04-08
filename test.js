'use strict'

const tap = require('tap')

const reduce = require('./iterables-reduce')

function test (name, testCase) {
  return tap.test(name, assert => {
    testCase(assert)
    return Promise.resolve()
  })
}

test('fails if falsey iterable given', assert => {
  assert.throws(TypeError, () => {
    reduce(null)
  })
  assert.throws(TypeError, () => {
    reduce(false)
  })
  assert.throws(TypeError, () => {
    reduce(0)
  })
})

test('fails if non-iterable given', assert => {
  assert.throws(TypeError, () => {
    reduce({[Symbol.iterable]: null})
  })
  assert.throws(TypeError, () => {
    reduce(true)
  })
  assert.throws(TypeError, () => {
    reduce(1)
  })
})

test('fails if non-function given as second arg', assert => {
  assert.throws(TypeError, () => {
    reduce([])
  })
  assert.throws(TypeError, () => {
    reduce([], true)
  })
  assert.throws(TypeError, () => {
    reduce([], {})
  })
})

test('fails if empty iterable given without initial value', assert => {
  assert.throws(TypeError, () => {
    reduce([], () => {})
  })
})

test('takes first value if available', assert => {
  assert.equal(reduce([], () => {}, 1), 1)
})

test('works as expected', assert => {
  assert.equal(reduce((function * () {
    yield 1
    yield 5
    yield 3
  })(), (acc, xs) => acc + xs, 0), 9)
})

test('sets index correctly (no initial)', assert => {
  const indices = []
  assert.equal(reduce(new Set([
    1,
    2,
    3
  ]), (acc, xs, idx) => {
    indices.push(idx)
    return null
  }), null)
  assert.deepEqual(indices, [1, 2])
})

test('sets index correctly (w/ initial)', assert => {
  const indices = []
  assert.equal(reduce(new Set([
    1,
    2,
    3
  ]), (acc, xs, idx) => {
    indices.push(idx)
    return null
  }, 0), null)
  assert.deepEqual(indices, [0, 1, 2])
})

test('sets all correctly', assert => {
  const alls = []
  const input = new Map([[0, 1], [2, 3]])
  assert.equal(reduce(input, (acc, xs, idx, all) => {
    alls.push(all)
    return null
  }, 0), null)

  for (const xs of alls) {
    assert.equal(xs, input)
  }
})
