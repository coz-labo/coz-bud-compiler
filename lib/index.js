/**
 * Bud compiler for coz.
 * @module coz-bud-compiler
 * @version 2.0.9
 */

'use strict'

const BudCompiler = require('./bud_compiler')

function budCompiler(config){
  return new BudCompiler(config)
}

budCompiler.budCompiler = budCompiler

module.exports = budCompiler
