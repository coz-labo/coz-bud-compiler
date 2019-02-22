/**
 * Bud file compiler.
 * @memberof module:coz-bud-compiler/lib
 * @inner
 * @constructor BudCompiler
 * @param {object} config - Compiler configuration.
 * @param {function} config.resolveTmpl - Resolve a tmpl.
 * @param {function} config.resolveEngine - A engine.
 */

'use strict'

const async = require('async')
const assert = require('assert')
const cozBud = require('coz-bud')
const prepareBudData = require('./prepare_bud_data')
const prepareBudTmpl = require('./prepare_bud_tmpl')
const prepareBudEngine = require('./prepare_bud_engine')
const compileBudTmpl = require('./compile_bud_tmpl')

/** @lends BudCompiler */
function BudCompiler(config = {}) {
  this.resolveTmpl = config.resolveTmpl
  this.resolveEngine = config.resolveEngine
  assert.ok(this.resolveTmpl, 'config.resolveTmpl is required.')
  assert.ok(this.resolveEngine, 'config.resolveEngine is required.')
}

BudCompiler.prototype = {
  /**
   * Compile bud.
   * @param {Bud} bud - Bud to compile.
   * @returns {Promise}
   */
  async compile(bud) {
    bud = [].concat(bud).map(cozBud.create)
    bud = await prepareBudData(bud)
    bud = await prepareBudTmpl(bud, this.resolveTmpl)
    bud = await prepareBudEngine(bud, this.resolveEngine)
    bud = await compileBudTmpl(bud)
    return bud
  }
}

module.exports = BudCompiler
