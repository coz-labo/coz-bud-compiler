/**
 * Update bud tmpl.
 * @memberof module:coz-bud-compiler/lib
 * @function prepareBudTmpl
 * @param {Bud} bud - Bud to work with.
 * @param {function} resolver - Tmpl resolver.
 * @returns {Promise}
 */

'use strict'

const async = require('async')
const _resolveStringValue = require('./_resolve_string_value')

/** @lends prepareBudTmpl */
async function prepareBudTmpl(buds, resolver) {
  const results = []
  for (const b of [].concat(buds)) {
    let tmpl = b.tmpl
    let resolved = resolver(tmpl)
    if (resolved) {
      tmpl = resolved
    }
    if (!tmpl) {
      throw new Error('[BudCompiler]Template not found:' + b.tmpl)
    }
    b.tmpl = await _resolveStringValue(tmpl, b.cwd)
    results.push(b)
  }
  return results
}

module.exports = prepareBudTmpl
