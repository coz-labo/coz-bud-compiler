/**
 * Update bud data.
 * @module coz-bud-compiler/lib
 * @function prepareBudData
 * @param {Bud} bud - Bud to work with.
 * @param {function} callback - Callback when done.
 */

'use strict'

const async = require('async')
const path = require('path')

/** @lends prepareBudData */
function prepareBudData (bud, callback) {
  async.concatSeries([].concat(bud), (bud, callback) => {
    let data = bud.data || {}
    if (typeof data === 'string') {
      let filename = path.resolve(bud.cwd, data)
      data = require(filename)
    }
    data.__proto__ = {}
    data.__proto__.$$bud = {
      cwd: bud.cwd,
      src: bud.src,
      path: bud.path
    }
    bud.data = data
    callback(null, bud)
  }, callback)
}

module.exports = prepareBudData;