/**
 * Update bud tmpl.
 * @memberof module:coz-bud-compiler/lib
 * @function prepareBudTmpl
 * @param {Bud} bud - Bud to work with.
 * @param {function} resolver - Tmpl resolver.
 * @param {function} callback - Callback when done.
 */

'use strict'

const async = require('async')
const _resolveStringValue = require('./_resolve_string_value')

/** @lends prepareBudTmpl */
function prepareBudTmpl (bud, resolver, callback) {
  async.concatSeries([].concat(bud), (bud, callback) => {
    let tmpl = bud.tmpl
    let resolved = resolver(tmpl)
    if (resolved) {
      tmpl = resolved
    }
    if (!tmpl) {
      callback(new Error('[BudCompiler]Template not found:' + bud.tmpl))
      return
    }
    _resolveStringValue(tmpl, bud.cwd, (err, tmpl) => {
      bud.tmpl = tmpl
      callback(err, bud)
    })
  }, callback)
}

module.exports = prepareBudTmpl
