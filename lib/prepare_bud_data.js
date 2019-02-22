/**
 * Update bud data.
 * @module coz-bud-compiler/lib
 * @function prepareBudData
 * @param {Bud} bud - Bud to work with.
 * @returns {Promise}
 */

'use strict'

const async = require('async')
const path = require('path')

/** @lends prepareBudData */
async function prepareBudData(buds) {
  const results = []
  for (const b of [].concat(buds)) {
    let data = b.data || {}
    if (typeof data === 'string') {
      let filename = path.resolve(b.cwd, data)
      data = require(filename)
    }
    data.__proto__ = {}
    data.__proto__.$$bud = {
      cwd: b.cwd,
      src: b.src,
      path: b.path
    }
    b.data = data
    results.push(b)
  }
  return results
}

module.exports = prepareBudData
