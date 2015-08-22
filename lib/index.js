/**
 * Bud compiler for coz.
 * @module coz-bud-compiler
 * @version 1.0.0
 */

"use strict";


var BudCompiler = require('./bud_compiler');

function budCompiler(config){
    return new BudCompiler(config);
}

budCompiler.budCompiler = budCompiler;

module.exports = budCompiler;
