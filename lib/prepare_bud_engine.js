/**
 * Update bud engine.
 * @memberof module:coz-bud-compiler/lib
 * @function prepareBudEngine
 * @param {Bud} bud - Bud to work with.
 * @param {function} resolver - Engine resolver.
 * @returns {Promise}
 */

'use strict'

/** @lends prepareBudEngine */
function prepareBudEngine(buds, resolver) {
  const results = []
  for (const b of [].concat(buds)) {
    let engine = b.engine
    let Engine = resolver(engine)
    if (Engine) {
      let setup = b.setup || {}
      setup.basedir = b.cwd
      engine = new Engine(setup)
    }
    if (!engine) {
      throw new Error('[BudCompiler]Engine not found:' + b.engine)
    }
    b.engine = engine
    results.push(b)
  }
  return results
}

module.exports = prepareBudEngine
